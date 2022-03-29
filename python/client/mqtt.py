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
        GPIO.setmode(GPIO.BOARD)
        import wiringpi
        wiringpi.wiringPiSetup()
    except RuntimeError:
        print("Error importing RPi.GPIO This is probably because you need superuser privileges.  You can achieve this by using 'sudo' to run your script")
if config["UPS"]:
    import ups
if config["DHT"]:
    import dht


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
    print(wiringpi.digitalRead(0)," GPIO wiringpi")
    for key in config["action"]:
        try:
            print("wiringpi.IN", wiringpi.GPIO.INPUT)
            print("wiringpi.OUT",wiringpi.GPIO.OUTPUT)
            Button = config["action"][key]
            if Button["mode"] == "in":
                wiringpi.pinMode(int(Button["pin"]), wiringpi.GPIO.INPUT) # pin in
                # GPIO.setup(int(Button["pin"]), GPIO.IN)
                print("init setup mode",Button["mode"],"pin",int(Button["pin"]));
            if Button["mode"] == "out":
                print(int(Button["pin"]),wiringpi.GPIO.OUTPUT)
                wiringpi.pinMode(int(Button["pin"]), wiringpi.GPIO.OUTPUT) # pin out
                # GPIO.setup(int(Button["pin"]), GPIO.OUT)
                print("init setup mode",Button["mode"],"pin",int(Button["pin"]));
                if config["mqtt"]["test"]:
                    wiringpi.digitalWrite(int(Button["pin"]), 1)
                    print(wiringpi.digitalRead(int(Button["pin"])))
                    # GPIO.output(int(Button["pin"]), True)
                    time.sleep(0.5)
                    wiringpi.digitalWrite(int(Button["pin"]), 0)
                    print(wiringpi.digitalRead(int(Button["pin"])))
                    # GPIO.output(int(Button["pin"]), False)
                    time.sleep(0.5)
                    wiringpi.digitalWrite(int(Button["pin"]), 1)
                    print(wiringpi.digitalRead(int(Button["pin"])))
                    # GPIO.output(int(Button["pin"]), True)
                    time.sleep(0.5)
                    wiringpi.digitalWrite(int(Button["pin"]), 0)
                    print(wiringpi.digitalRead(int(Button["pin"])))
                    # GPIO.output(int(Button["pin"]), False)
            if Button["mode"] == "pwm":
                wiringpi.pinMode(int(Button["pin"]), 1)
                # GPIO.setup(int(Button["pin"]), GPIO.OUT)
                print("init setup mode",Button["mode"],"pin",int(Button["pin"]));
            try:
                if Button["pullUpDnControl"] != "":
                    if Button["pullUpDnControl"] == "up":
                        pull = wiringpi.GPIO.PUD_UP
                    if Button["pullUpDnControl"] == "down":
                        pull = wiringpi.GPIO.PUD_DOWN
                    wiringpi.pullUpDnControl(int(Button["pin"]), pull)
            except:
                print("not key:pullUpDnControl as pin",int(Button["pin"]),"in to config")
                # GPIO.cleanup()
        except RuntimeWarning as e:
            print(e)
            # GPIO.cleanup()



uid = config["mqtt"]["uid"]
separation = config["mqtt"]["separation"]
topic_d = config["mqtt"]["sub"]["topic"].split(separation)
topic = str(topic_d[0])
CLient = str(uid)


def on_message(client, obj, data):
    print(data.topic + " " + str(data.qos) + " " + str(data.payload))
    if (data.topic != ""):
            splitTopic = data.topic.split(separation)
            groupTopic = splitTopic[0]
            clientTopic = splitTopic[1]
            dataValue = data.payload.decode("utf-8")
            if(groupTopic == "status"):
                eventTopic = splitTopic[2]
                if(eventTopic == "demande"):
                    mqttc.publish(f"system/{CLient}/status" , f"{uid}")
            if (groupTopic == topic):
                if(clientTopic == CLient):
                    if config["GPIO"]:
                        for key in config["action"]:
                            try:
                                ledOrRelais = config["action"][key]
                                conditionJsonIn = json.loads(dataValue)
                                if ledOrRelais["type"] == "led":
                                    conditionJsonkey = list(conditionJsonIn.keys())[0]
                                    if conditionJsonkey == ledOrRelais["mqtt"]["topic"]:
                                        value = conditionJsonIn[conditionJsonkey]
                                        condictionValue = bool(value == ledOrRelais["mqtt"]["value"])
                                        print("con",value,ledOrRelais["mqtt"]["value"] ,condictionValue,int(ledOrRelais["pin"]))
                                        wiringpi.digitalWrite(int(ledOrRelais["pin"]),condictionValue)
                                if ledOrRelais["type"] == "relais":
                                    conditionJsonkey = list(conditionJsonIn.keys())[0]
                                    if conditionJsonkey == ledOrRelais["mqtt"]["topic"]:
                                        value = conditionJsonIn[conditionJsonkey]
                                        condictionValue = bool(value == ledOrRelais["mqtt"]["value"])
                                        print("con",value,ledOrRelais["mqtt"]["value"] ,condictionValue,int(ledOrRelais["pin"]))
                                        wiringpi.digitalWrite(int(ledOrRelais["pin"]),condictionValue)
                            except json.decoder.JSONDecodeError:
                                print(dataValue)
                        try:
                            ert = splitTopic[2]
                        except IndexError:
                            envoie_status_pin()


def on_connect(client, userdata, flags, rc):
    print("rc: connecter" + str(rc)+ " " +str(flags))
    mqttc.publish(f"system/{CLient}/status" , f"{uid}")


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


def callback():
    rc = 0
    while rc == 0:
        rc = mqttc.loop()
    print("rc:", str(rc))


for key in config["mqtt"]["sub"]:
    value = config["mqtt"]["sub"][key]
    if value != "":
        value = value.replace("uid", str(config["mqtt"]["uid"]))
        mqttc.subscribe(value, 0)
        print(f"{key} subscribe : {value}")
    else:
        print(f"not {key}")
for key in config["mqtt"]["pub"]:
    value = config["mqtt"]["pub"][key]
    if value != "":
        value = value.replace("uid", str(config["mqtt"]["uid"])).replace("topic", str(config["mqtt"]["sub"]["topic"])).replace("tgroup", str(config["mqtt"]["sub"]["group"]))
        config["mqtt"]["pub"][key] = value
        # mqttc.subscribe(value, 0)
        print(f"{key} publi : {value}")
    else:
        print(f"not publi: {key}")
for key in config["mqtt"]["pubEvent"]:
    value = config["mqtt"]["pubEvent"][key]
    if value != "":
        value = value.replace("uid", str(config["mqtt"]["uid"])).replace("topic", str(config["mqtt"]["sub"]["topic"])).replace("tgroup", str(config["mqtt"]["sub"]["group"]))
        config["mqtt"]["pubEvent"][key] = value
        # mqttc.subscribe(value, 0)
        print(f"{key} publi : {value}")
    else:
        print(f"not publi: {key}")

def envoie_mqtt(code,dis):
    #print(f"{code}{separation}{returnTopic}{separation}{json.dumps(dis)}")
    mqttc.publish(code,f"{json.dumps(dis)}")


def envoie_status_pin():
    print("envoie_status_pin")
    dictAll = {}
    for key in config["action"]:
        Button = config["action"][key]
        btnRead = wiringpi.digitalRead(int(Button["pin"]))
        # dis = {key: btnRead}
        dictAll[key] = btnRead
    for keypub in config["mqtt"]["pub"]:
        valuepub = config["mqtt"]["pub"][keypub]
        print(valuepub)
        if valuepub != "":
            print(valuepub)
            envoie_mqtt(f"{valuepub}",dictAll)


def execute_pin(pin):
    for key in config["action"]:
        Button = config["action"][key]
        if Button["pin"] == pin:
            btnRead = wiringpi.digitalRead(int(Button["pin"]))
            dis = {Button['mqtt']['topic']: btnRead}
            if Button["type"] == "swich":
                if btnRead == 1:
                    print("btn 1")
                    envoie_mqtt(f"{topic}/{CLient}",dis)
                if btnRead == 0:
                    print("btn 0")
                    envoie_mqtt(f"{topic}/{CLient}/{Button['mqtt']['topic']}",dis)
            if Button["type"] == "button":
                if btnRead == 1:
                    envoie_mqtt(f"{topic}/{CLient}/{Button['mqtt']['topic']}",dis)
            for keypub in config["mqtt"]["pubEvent"]:
                valuepub = config["mqtt"]["pubEvent"][keypub]
                print(valuepub)
                if valuepub != "":
                    print(valuepub)
                    envoie_mqtt(f"{valuepub}",dis)
    envoie_status_pin()


def while_wiringpi():
    for key in config["action"]:
        try:
            Buttons = config["action"][key]
            if Buttons["type"] == "swich" or Buttons["type"] == "button":
                print("init event", int(Buttons["pin"]),Buttons["type"])
                wiringpi.wiringPiISR(int(Buttons["pin"]),wiringpi.GPIO.INT_EDGE_BOTH, callback=globals()["execute_pin"],bouncetime=200)
        except RuntimeError as erreur:
            print("Pin Double event ou pin non exsitente, On utilier les pins BORD",erreur,int(Buttons["pin"]))


Thread_callback = Thread_custom(target=callback, name="callback")
Thread_callback.Daemon = True
Thread_callback.start()

if config["GPIO"]:
    while_wiringpi()
if config["UPS"]:
    Thread_upsexecut = Thread_custom(target=ups.upsexecut, name="upsexecut", args=(mqttc,config))
    Thread_upsexecut.Daemon = True
    Thread_upsexecut.start()
if config["DHT"]:
    Thread_dht = Thread_custom(target=dht.dth, name="Thread_dht", args=(config,mqttc))
    Thread_dht.Daemon = True
    Thread_dht.start()
    print("DHT")

print(Thread_callback.is_alive())