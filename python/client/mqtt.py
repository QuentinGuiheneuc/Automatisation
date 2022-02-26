#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import paho.mqtt.client as mqtt
import time
import json

def lire_fichier_Json(fichier):
    with open(fichier) as fichiers:
        return json.load(fichiers)


def ecrire_fichier(fichier,data):
    if is_fichier(fichier):        
        fichiers = open(fichier, "w")
        fichiers.write(data)
        fichiers.close()
        time.sleep(1)
        return lire_fichier(fichier)


def lire_fichier(fichier):
    if is_fichier(fichier):
        with open(fichier, "r") as fichiers:
            return fichiers.read()
    else:
        return ""


def is_fichier(Path):
    try:
        with open(Path, 'r') as f:
            return True
    except FileNotFoundError as e:
        return False
    except IOError as e:
        return False


config = lire_fichier_Json("config.json")
from threading import Thread
if config["GPIO"]:
    try:
        import RPi.GPIO as GPIO
        GPIO.cleanup()
    except RuntimeError:
        print("Error importing RPi.GPIO This is probably because you need superuser privileges.  You can achieve this by using 'sudo' to run your script")
if config["UPS"]:
    import ups

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
    def terminate(self):
        self._running = False 

if config["GPIO"]: # init
    GPIO.setmode(GPIO.BOARD)
    for key in config["action"]:
        try:
            print("GPIO.IN",GPIO.IN)
            print("GPIO.OUT",GPIO.OUT)
            Button = config["action"][key]
            if Button["mode"] == "in":
                GPIO.setup(int(Button["pin"]), GPIO.IN)
                print("init setup mode",Button["mode"],"pin",int(Button["pin"]));
            if Button["mode"] == "out":
                GPIO.setup(int(Button["pin"]), GPIO.OUT)
                print("init setup mode",Button["mode"],"pin",int(Button["pin"]));
                if config["mqtt"]["test"]:
                    GPIO.output(int(Button["pin"]), True)
                    time.sleep(0.5)
                    GPIO.output(int(Button["pin"]), False)
                    time.sleep(0.5)
                    GPIO.output(int(Button["pin"]), True)
                    time.sleep(0.5)
                    GPIO.output(int(Button["pin"]), False)
            if Button["mode"] == "pwm":
                GPIO.setup(int(Button["pin"]), GPIO.OUT)
                print("init setup mode",Button["mode"],"pin",int(Button["pin"]));
            try:
                if Button["pullUpDnControl"] != "":
                    if Button["pullUpDnControl"] == "up":
                        pull = GPIO.PUD_UP
                    if Button["pullUpDnControl"] == "down":
                        pull = GPIO.PUD_DOWN
                    GPIO.setup(int(Button["pin"]), GPIO.IN , pull_up_down=pull)
            except:
                print("not key:pullUpDnControl as pin",int(Button["pin"]),"in to config")
                GPIO.cleanup()
        except RuntimeWarning as e:
            GPIO.cleanup()

statusBtn_1 = False
topic = config["mqtt"]["topic"]
uid = config["mqtt"]["uid"]
FichierClient = config["mqtt"]["name_client_flie"]
separation = config["mqtt"]["separation"]

Topic = f"{uid}/#"
CLient = str(uid)

def on_connect(client, userdata, flags, rc):
    print("rc: " + str(rc)+ " " +str(flags))


def on_message(client, obj, data):
    print(data.topic + " " + str(data.qos) + " " + str(data.payload))
    if (data.topic != ""):
            splitTopic = data.topic.split("/")
            groupTopic = splitTopic[0]
            clientTopic = splitTopic[1]
            eventTopic = splitTopic[2]
            dataValue = data.payload.decode("utf-8")
            if(groupTopic == "status"):
                if(eventTopic == "demande"):
                    mqttc.publish(f"system/{CLient}/status" , f"{uid}")
            if (groupTopic == topic):
                if(clientTopic == CLient):
                    if config["GPIO"]:
                        for key in config["action"]:
                            ledOrRelais = config["action"][key]
                            if ledOrRelais["type"] == "led":
                                if eventTopic == ledOrRelais["mqtt"]["topic"]:
                                    conditionJsonIn = json.loads(dataValue)
                                    value = conditionJsonIn['value']
                                    condictionValue = bool(value == ledOrRelais["mqtt"]["value"])
                                    print("con",value,ledOrRelais["mqtt"]["value"] ,condictionValue,int(ledOrRelais["pin"]))
                                    GPIO.output(int(ledOrRelais["pin"]),condictionValue)
                            if ledOrRelais["type"] == "relais":
                                if eventTopic == ledOrRelais["mqtt"]["topic"]:
                                    conditionJsonIn = json.loads(dataValue)
                                    value = conditionJsonIn['value']
                                    condictionValue = bool(value == ledOrRelais["mqtt"]["value"])
                                    print("con",value,ledOrRelais["mqtt"]["value"] ,condictionValue,int(ledOrRelais["pin"]))
                                    GPIO.output(int(ledOrRelais["pin"]),condictionValue)

   
def on_publish(client, obj, mid):
    print("mid: " + str(mid))


def on_subscribe(client, obj, mid, granted_qos):
    print("Subscribed: " + str(mid) + " " + str(granted_qos))




mqttc = mqtt.Client(CLient)
mqttc.on_message = on_message
mqttc.on_connect = on_connect
mqttc.on_publish = on_publish
mqttc.on_subscribe = on_subscribe
mqttc.username_pw_set(config["mqtt"]["username"], config["mqtt"]["password"])
mqttc.connect(config["mqtt"]["host"],config["mqtt"]["port"])



if is_fichier(FichierClient):
    if lire_fichier(FichierClient) == "":
        print("le fichier est vide")
        returnTopic = uid
        mqttc.subscribe(str(returnTopic), 0)
        mqttc.publish(topic, f"400{separation}{uid}{separation}{returnTopic}")
    else:
        returnTopic = lire_fichier(FichierClient)
        mqttc.subscribe(str(lire_fichier(FichierClient)), 0)
        print(lire_fichier(FichierClient))
else:
    print("le fichier est pas presant")
    # mqttc.subscribe(str(returnTopic), 0)
    mqttc.publish(topic, f"400{separation}{uid}{separation}{returnTopic}")

mqttc.subscribe("status/#", 0)
print(f"{topic}/{Topic}")
mqttc.subscribe(f"{topic}/{Topic}", 0)

def callback():
    rc = 0
    while rc == 0:
        rc = mqttc.loop()
    print("rc:", str(rc))


def envoie_mqtt(code,dis):
    #print(f"{code}{separation}{returnTopic}{separation}{json.dumps(dis)}")
    mqttc.publish(code,f"{json.dumps(dis)}")


def execute_pin(pin):
    for key in config["action"]:
        Button = config["action"][key]
        if Button["pin"] == pin:
            btnRead = GPIO.input(int(Button["pin"]))
            dis = {"value": btnRead}
            if Button["type"] == "swich":
                if btnRead == 1:
                    print("btn 1")
                    envoie_mqtt(f"{topic}/{CLient}/{Button['mqtt']['topic']}",dis)
                if btnRead == 0:
                    print("btn 0")
                    envoie_mqtt(f"{topic}/{CLient}/{Button['mqtt']['topic']}",dis)
            if Button["type"] == "button":
                if btnRead == 1:
                    envoie_mqtt(f"{topic}/{CLient}/{Button['mqtt']['topic']}",dis)

def while_wiringpi():
    for key in config["action"]:
        try:
            Buttons = config["action"][key]
            if Buttons["type"] == "swich" or Buttons["type"] == "button":
                print("init event", int(Buttons["pin"]),Buttons["type"])
                GPIO.add_event_detect(int(Buttons["pin"]), GPIO.RISING, callback=globals()["execute_pin"],bouncetime=200)
        except RuntimeError as erreur:
            print("Pin Double event ou pin non exsitente, On utilier les pins BORD",erreur,int(Buttons["pin"]) )
            GPIO.cleanup()


Thread_callback = Thread_custom(target=callback, name="callback")
Thread_callback.Daemon = True
Thread_callback.start()

if config["GPIO"]:
    while_wiringpi()
if config["UPS"]:
    Thread_upsexecut = Thread_custom(target=ups.upsexecut, name="upsexecut", args=(mqttc,config,returnTopic))
    Thread_upsexecut.Daemon = True
    Thread_upsexecut.start()

print(Thread_callback.is_alive())