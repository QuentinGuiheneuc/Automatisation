#!/usr/bin/env python3
# -*- coding: utf-8 -*-
from typing import Match
import paho.mqtt.client as mqtt
import time
import mariadb
import json
import socket, multiprocessing
import os
import random
import datetime
from threading import Thread
import fonction as actions

class Thread_custom(Thread):
    def __init__(self, group=None, target=None, name=None,
                 args=(), kwargs={}, Verbose=None):
        Thread.__init__(self, group, target, name, args, kwargs)
        self._return = None
    def run(self):
        print(type(self._target))
        if self._target is not None:
            self._return = self._target(*self._args,**self._kwargs)
    def join(self, *args):
        Thread.join(self, *args)
        return self._return
    def stop(self):
        self._running = False 


def lire_fichier_Json(fichier):
    with open(fichier) as fichiers:
        return json.load(fichiers)


config = lire_fichier_Json("config.json")

separation = config["mqtt"]["separation"]
host = config["socket"]["host"]
port = config["socket"]["port"]
nb_workers = config["socket"]["nb_workers"]
is_start = False
buff_socket = config["socket"]["buff"]
separation_socket = config["socket"]["separation"]
white_list_ip_socket = config["socket"]["white_list_ip"]
encode_socket = config["socket"]["encode"]
user_socket = ""
lock = False
Client_id = config["mqtt"]["clientId"]

client = mqtt.Client(Client_id, userdata=True)
client.username_pw_set(config["mqtt"]["username"], config["mqtt"]["password"])
client.connect(config["mqtt"]["serverUrl"], config["mqtt"]["port"])

# MQTT
def on_execut(cliente, userdata, message):
    mydb1 = mariadb.connect(
        host=config["mysql"]["host"],
        user=config["mysql"]["user"],
        password=config["mysql"]["password"],
        database=config["mysql"]["database"],
    )
    payload = message.payload.decode("utf-8")
    print(
        " < received message "
        + message.topic
    )
    actions.notify_error(mydb1, message,separation)
    try:
        print(message.topic, message.payload.decode("utf-8"))
        if (message.topic != ""):
            splitTopic = message.topic.split("/")
            groupTopic = splitTopic[0]
            clientTopic = splitTopic[1]
            eventTopic = splitTopic[2]
            if(actions.is_exists_client(mydb1,clientTopic)):
                if(groupTopic == "system"):
                    if(eventTopic == "status"):
                        actions.listeObjet(mydb1, payload)
                    if(eventTopic == "new"):
                        CLient = actions.add_client_mqtt(mydb1,clientTopic)
                        #client.publish(f"{}", f"401{separation}{CLient}", 0)
                if(groupTopic != "system"):
                    if(eventTopic == "post"):
                        actions.cache_(mydb1, message)
                    print(splitTopic)
                # print(payload)
                    actions.execute(mydb1, message, client)
                if payload.startswith("400"):  # demanded on client
                    pay = payload.split(separation)
                    CLient = actions.add_client_mqtt(mydb1, pay[1])
                    client.publish(pay[2], f"401{separation}{CLient}", 0)
                    CLient = ""
                    if payload.startswith("404"):
                        print()
                        #print(actions.listeObjet(mydb1, message))
                        if payload.startswith("405"):
                            call_All_Objet(mydb1)
                        # actions.execute(mydb1, message, client, separation)
                        # actions.cache_(mydb1, message,separation)
    except ValueError as e:
        print()
        mydb1.close()


def on_publish(client, userdata, mid):
    print(" > published message: {}".format(mid))


def on_subscribe(client, obj, mid, granted_qos):
    print(
        "Subscribed: " + str(mid) + " " + str(granted_qos)
    )


def on_disconnect(client, userdata, rc):
    if rc != 0:
        print(f"Unexpected disconnection.{str(userdata)}")


def callback():
    rc = 0
    while rc == 0:
        if is_start:
            rc = client.loop()

client.on_message = on_execut
client.on_subscribe = on_subscribe
client.on_publish = on_publish
client.on_disconnect = on_disconnect

def call_All_Objet(mydb):
    actions.initListeObjet(mydb)
    client.publish(f"status/{Client_id}/demande", "")

ThreadMqtt = Thread_custom(target=callback, name="callback")
ThreadMqtt.Daemon = True

# Auto Start
if config["start"]:
    mydb2 = mariadb.connect(
        host=config["mysql"]["host"],
        port=config["mysql"]["port"],
        user=config["mysql"]["user"],
        password=config["mysql"]["password"],
        database=config["mysql"]["database"],
    )
    is_start = True
    ThreadMqtt.start()
    for (titreTopic) in actions.print_titreTopic(mydb2):
        client.subscribe(titreTopic, 2)
    client.subscribe("$SYS/#", 2)
    lock = True

# Socket
with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    s.bind((host, port))
    s.listen(1)
    with multiprocessing.Pool(nb_workers) as pool:
        while True:
            conn, address = s.accept()
            with conn:
                mydb = mariadb.connect(
                    host=config["mysql"]["host"],
                    port=config["mysql"]["port"],
                    user=config["mysql"]["user"],
                    password=config["mysql"]["password"],
                    database=config["mysql"]["database"],
                )
                if (
                    white_list_ip_socket.count(
                        str(address[0])
                    )
                    > 0
                ):
                    buff = conn.recv(buff_socket)
                    # message = buff.decode('utf-8')
                    slipte = buff.decode(encode_socket).split(
                        separation_socket
                    )
                    try:
                        action = slipte[0]
                    except IndexError:
                        conn.sendall(f"erreur_{separation_socket}".encode(encode_socket))
                    try:
                        action_1 = slipte[1]
                    except IndexError:
                        conn.sendall(f"erreur_{separation_socket}".encode(encode_socket))
                    
                    if action == "list":
                        if action_1 == "topic":
                            conn.sendall(f"list{separation_socket}{actions.liste_topic(mydb)}".encode(encode_socket))
                        if action_1 == "client":
                            conn.sendall(f"list{separation_socket}{actions.liste_client(mydb)}".encode(encode_socket))
                        if action_1 == "cache":
                            conn.sendall(f"list{separation_socket}{actions.liste_cache(mydb)}".encode(encode_socket))
                        if action_1 == "attclient":
                            conn.sendall(f"list{separation_socket}{actions.affiche_client_att(mydb)}".encode(encode_socket))
                        if action_1 == "execute":
                            exe = actions.liste_execute(mydb)
                            print("Execute" ,exe)
                            conn.sendall(f"list{separation_socket}{exe}".encode(encode_socket))
                    if action == "server":
                        if action_1 == "start":
                            is_start = True                            
                            try:
                                if not lock:
                                    for titreTopic in actions.print_titreTopic(mydb):
                                        client.subscribe(titreTopic, 0)
                                        print(titreTopic)
                                    lock = True
                                if not ThreadMqtt.is_alive():
                                    ThreadMqtt.start()
                                conn.sendall(
                                    f"{action}{separation_socket}{action_1}{separation_socket}{is_start}".encode(
                                        encode_socket
                                    )
                                )
                            except RuntimeError as e:
                                conn.sendall(
                                    f"erreur start {e}".encode(
                                        encode_socket
                                    )
                                )
                                print("server start")
                        if action_1 == "stop":
                            is_start = False                 
                            conn.sendall(
                                f"{action}{separation_socket}{action_1}{separation_socket}{is_start}".encode(
                                    encode_socket
                                )
                            )
                            print("server stop")
                            # break
                        if action_1 == "status":
                            conn.sendall(
                                f"{action}{separation_socket}{action_1}{separation_socket}{is_start}".encode(
                                    encode_socket
                                )
                            )
                            print(f"{action}{separation_socket}{action_1}{separation_socket}{is_start}")
                    if action == "objet":
                        if action_1 == "topic":
                            value = slipte[2]
                            liste = actions.cache_topic(mydb,value,separation)
                            print(liste)
                            conn.sendall(f"{liste}".encode(encode_socket))
                        if action_1 == "is_co":
                            call_All_Objet(mydb)
                            conn.sendall(
                                f"exe".encode(encode_socket)
                            )
                    if action == "add":
                        if action_1 == "client":
                            uid = slipte[2]
                            name = slipte[3]
                            topic = slipte[4]
                            conn.sendall(f"{actions.add_client(mydb,separation_socket,name,uid,topic)}".encode(encode_socket))
                        if action_1 == "fkfk":
                            print()
                    if action == "update":
                        if action_1 == "clientname":
                            uid = slipte[2]
                            name = slipte[3]
                            conn.sendall(f"{actions.update_client_name(mydb,separation_socket,name,uid)}".encode(encode_socket))
                    #if action == "":      
