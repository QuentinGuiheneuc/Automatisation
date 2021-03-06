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
import xmltodict

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
    # print('ogoo')
    # actions.notify_error(mydb1, message,separation)
    try:
        #print(message.topic, message.payload.decode("utf-8"))
        if (message.topic != ""):
            splitTopic = message.topic.split("/")
            groupTopic = splitTopic[0]
            clientTopic = splitTopic[1]

            if(actions.is_exists_client(mydb1,clientTopic)):
                print(splitTopic ,payload)
                if(groupTopic == "system"):
                    eventTopic = splitTopic[2]
                    if(eventTopic == "status"):
                        actions.listeObjet(mydb1, clientTopic, payload)
                    if(eventTopic == "new"):
                        CLient = actions.add_client_mqtt(mydb1,clientTopic)
                        #client.publish(f"{}", f"401{separation}{CLient}", 0)
                actions.cache_(mydb1, message)
                try:
                    eventTopic = splitTopic[2]
                    
                    actions.execute(mydb1, message, client)
                except:
                    eventTopic = ""
                
                if(groupTopic != "system" and eventTopic != ""):
                    if(eventTopic == "status"):
                        actions.listeObjet(mydb1, clientTopic,payload)
                    if(eventTopic == "post"):
                        actions.cache_(mydb1, message)
                if(groupTopic == "wled"):
                    eventTopic = splitTopic[2]
                    if (eventTopic == "v"):
                        o = xmltodict.parse(payload)
                        print(json.dumps(o))
                   # print(splitTopic)
                # print(payload)
                
                # if payload.startswith("400"):  # demanded on client
                #     pay = payload.split(separation)
                #     CLient = actions.add_client_mqtt(mydb1, pay[1])
                #     client.publish(pay[2], f"401{separation}{CLient}", 0)
                #     CLient = ""
                #     if payload.startswith("404"):
                #         print(payload)
                #         #print(actions.listeObjet(mydb1, message))
                #         if payload.startswith("405"):
                #             call_All_Objet(mydb1)
                #         # actions.execute(mydb1, message, client, separation)
                #         # actions.cache_(mydb1, message,separation)
            mydb1.close()
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

def on_connect(client, userdata, rc):
    if rc != 0:
        print(f"Unexpected on_connect.{str(userdata)}")

def callback():
    rc = 0
    while rc == 0:
        if is_start:
            rc = client.loop()

client.on_message = on_execut
client.on_subscribe = on_subscribe
client.on_publish = on_publish
client.on_disconnect = on_disconnect
# client.on_connect = on_connect
def call_All_Objet(mydb):
    actions.initListeObjet(mydb)
    client.publish(f"status/{Client_id}/demande", "")

ThreadViweLogMqtt = Thread_custom(target=actions.wath, name="ThreadViweLogMqtt")
ThreadViweLogMqtt.Daemon = True

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
    ThreadViweLogMqtt.start()
    ThreadMqtt.start()

    for (titreTopic) in actions.print_titreTopic(mydb2):
        client.subscribe(titreTopic, 2)
    client.subscribe("#", 2)
    lock = True
    mydb2.close()

# Socket
with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    s.bind((host, port))
    s.listen(1)
    with multiprocessing.Pool(nb_workers) as pool:
        while True:
            conn, address = s.accept()
            with conn:
                print(address)
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
                    print("pass")
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
                            cache = actions.liste_cache(mydb)
                            # btrr = len(bytes(cache.encode(encode_socket)))
                            conn.sendall(f"list{separation_socket}{cache}".encode(encode_socket))
                        if action_1 == "attclient":
                            conn.sendall(f"list{separation_socket}{actions.affiche_client_att(mydb)}".encode(encode_socket))
                        if action_1 == "autom":
                            id_ = slipte[2]
                            exe = actions.liste_autom(mydb,id_)
                            print("autom" ,id_)
                            conn.sendall(f"list{separation_socket}{exe}".encode(encode_socket))
                        if action_1 == "param":
                            id = slipte[2]
                            listParam = actions.liste_param(mydb,id)
                            conn.sendall(f"list{separation_socket}{listParam}".encode(encode_socket))
                        if action_1 == "exe":
                            id = slipte[2]
                            listexe = actions.liste_exe(mydb,id)
                            conn.sendall(f"list{separation_socket}{listexe}".encode(encode_socket))

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
                                    ThreadViweLogMqtt.start()
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
                            liste = actions.cache_topic(mydb,value)
                            print(liste)
                            conn.sendall(f"topic{separation_socket}{liste}".encode(encode_socket))
                        if action_1 == "is_co":
                            # call_All_Objet(mydb)
                            conn.sendall(
                                f"exe".encode(encode_socket)
                            )
                        if action_1 == "is_co_res":
                            actions.is_exists_client(mydb,1)
                            conn.sendall(f"is_co_res{separation_socket}true".encode(encode_socket))
                        if action_1 == "exe":
                            id_ = slipte[2]
                            json_ = slipte[3]
                            actions.execute_uno(mydb,client,id_,json_)
                            conn.sendall(f"objet{separation_socket}exe{separation_socket}true".encode(encode_socket))
                    if action == "add":
                        if action_1 == "client":
                            uid = slipte[2]
                            name = slipte[3]
                            topic = slipte[4]
                            conn.sendall(f"{actions.add_client(mydb,separation_socket,name,uid,topic)}".encode(encode_socket))
                        if action_1 == "autom":
                            json_ = slipte[2]
                            conn.sendall(f"{actions.add_autom(mydb,separation_socket,json_)}".encode(encode_socket))
                        if action_1 == "param":
                            name = str(slipte[2])
                            param_json = slipte[3]
                            value = actions.add_mqtt_param(mydb,separation_socket, name, param_json)
                            print(name,param_json)
                            conn.sendall(f"{value}".encode(encode_socket)) 
                        if action_1 == "exe":
                            exe_json = slipte[2]
                            value = actions.add_exe(mydb,separation_socket,exe_json)
                            conn.sendall(f"{value}".encode(encode_socket))                          

                    if action == "update":
                        if action_1 == "clientname":
                            uid = slipte[2]
                            name = slipte[3]
                            conn.sendall(f"{actions.update_client_name(mydb,separation_socket,name,uid)}".encode(encode_socket))
                        if action_1 == "param":
                            jsonVal = slipte[2]
                            conn.sendall(f"{actions.update_mqtt_param(mydb,separation_socket,jsonVal)}".encode(encode_socket))
                        if action_1 == "exe":
                            jsonVal = slipte[2]
                            conn.sendall(f"{actions.update_exe(mydb,separation_socket,jsonVal)}".encode(encode_socket))
                    if action == "del":
                        if action_1 == "param":
                            id = slipte[2]
                            conn.sendall(f"{actions.deleted_param(mydb,separation_socket,id)}".encode(encode_socket))   
                        if action_1 == "autom":
                            id = slipte[2]
                            conn.sendall(f"{actions.deleted_autom(mydb,separation_socket,id)}".encode(encode_socket))
                        if action_1 == "exe":
                            id = slipte[2]
                            conn.sendall(f"{actions.deleted_exe(mydb,separation_socket,id)}".encode(encode_socket))
                else:
                    conn.close()
