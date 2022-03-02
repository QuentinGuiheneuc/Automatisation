#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from ast import Return
import json
import random
import datetime
import time
import erreur
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import mariadb



def lire_fichier(fichier):
    if is_fichier(fichier):
        with open(fichier, "r") as fichiers:
            return fichiers.read()
    else:
        return ""


def lire_fichier_log(fichier):
    if is_fichier(fichier):
        with open(fichier, "r") as fichiers:
            return fichiers.readlines()[-1]
    else:
        return ""


def is_fichier(Path):
    try:
        with open(Path, "r") as f:
            return True
    except FileNotFoundError as e:
        return False
    except IOError as e:
        return False


def lire_fichier_Json(fichier):
    with open(fichier) as fichiers:
        return json.load(fichiers)


def on_created(event):
    print(f"hey, {event.src_path} has been created!")


def on_deleted(event):
    print(f"what the f**k! Someone deleted {event.src_path}!")


def on_modified(event):
    mydb1 = mariadb.connect(
        host="192.168.1.39",
        port=3306,
        user="root",
        password="root",
        database="bbd_projet",
    )
    # print(f"hey buddy, {event.src_path} has been modified")
    lastline = lire_fichier_log(event.src_path)
    # print(lastline)
    lastlinesp = lastline.split(" ")
    rsitime = lastlinesp[0].replace(":","")
    # print(rsitime)
    istime = time.localtime(int(rsitime))
    print(f"{istime.tm_hour}:{istime.tm_min}")
    print(lastlinesp)
    try:
        if lastlinesp.index("disconnected") != 0:
            try:
                mycursor = mydb1.cursor()
                sql = f"UPDATE `mqttclient` SET `is_alive` = '0' WHERE `uid` = '{lastlinesp[2]}'"
                mycursor.execute(sql)
                mydb1.commit()
                print(sql)
            except:
                print("Error", sql)
            print(f"disconnected {lastlinesp[2]} \n")
    except ValueError as err :
        pass

    try:
        if lastlinesp.index("connected") != 0:
            # try:
            #     mycursor = mydb1.cursor()
            #     sql = f"UPDATE `mqttclient` SET `is_alive` = '1', `ip` = '{ipandprot[0]}' WHERE `uid` = '{lastlinesp[7]}'"
            #     mycursor.execute(sql)
            #     mydb1.commit() 
            # except print(0):
            #     pass
            try:
                ipandprot = lastlinesp[5].split(":")
                mycursor = mydb1.cursor()
                sql = f"UPDATE `mqttclient` SET `is_alive` = '1', `ip` = '{ipandprot[0]}' WHERE `uid` = '{lastlinesp[7]}'"
                mycursor.execute(sql)
                mydb1.commit()
                print(sql)
            except Exception as err:
                print(err, sql)
            print(f"connected {lastlinesp[5]} {lastlinesp[7]}\n")
    except ValueError as err:
        pass
    
    if "closed" in lastline:
        try:
            mycursor = mydb1.cursor()
            sql = f"UPDATE `mqttclient` SET `is_alive` = '0' WHERE `uid` = '{lastlinesp[2]}'"
            mycursor.execute(sql)
            mydb1.commit()
            print(sql)
        except:
            print("Error", sql)
        print(f"closed {lastlinesp[2]} \n")
    mydb1.close()


def on_moved(event):
    print(f"ok ok ok, someone moved {event.src_path} to {event.dest_path}")


def wath():
    print("start wath")
    my_event_handler = FileSystemEventHandler()

    my_event_handler.on_created = on_created
    my_event_handler.on_deleted = on_deleted
    my_event_handler.on_modified = on_modified
    my_event_handler.on_moved = on_moved

    path = "/var/log/mosquitto/mosquitto.log"
    go_recursively = True
    my_observer = Observer()
    my_observer.schedule(my_event_handler, path, recursive=go_recursively)
    my_observer.start()
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        my_observer.stop()
        my_observer.join()


def executeConsition(value_1, condition, value_2):
    if condition == "==":
        return value_1 == value_2
    if condition == "!=":
        return value_1 != value_2
    if condition == "<":
        return value_1 < value_2
    if condition == ">":
        return value_1 > value_2
    if condition == "<=":
        return value_1 <= value_2
    if condition == ">=":
        return value_1 >= value_2


def cache_(bbd, message):
    payload = message.payload.decode("utf-8")
    if message.topic != "":
        splitTopic = message.topic.split("/")
        groupTopic = splitTopic[0]
        clientTopic = splitTopic[1]
        eventTopic = splitTopic[2]
        if eventTopic == "post":
            mycursor = bbd.cursor()
            sql = "SELECT id_client FROM `mqttcache` WHERE `id_client` = (SELECT id_client FROM `mqttclient` WHERE `uid` = '{0}')".format(
                clientTopic
            )
            mycursor.execute(sql)
            myresult = mycursor.fetchall()
            print("cache_", myresult)
            if myresult != []:
                sql = f"UPDATE `mqttcache` SET `ressult`='{payload}' WHERE `id_client` = (SELECT id_client FROM `mqttclient` WHERE `uid` = '{clientTopic}')"
                print("UPDATE \n")
                mycursor.execute(sql)
                bbd.commit()
            else:
                sql = f"INSERT INTO `mqttcache`(`id_topic`, `id_client`, `ressult`) VALUES ((SELECT id_topic FROM `mqtttopic` WHERE topic = '{groupTopic}/#'),(SELECT id_client FROM `mqttclient` WHERE `uid` = '{clientTopic}'), '{payload}')"
                print("INSERT \n")
                mycursor.execute(sql)
                bbd.commit()


def add_client_mqtt(bbd, uid):
    mycursor = bbd.cursor()
    mycursor.execute(
        "SELECT client,uid FROM `mqttclient` WHERE `client` = "
        + uid
    )
    myresult = mycursor.fetchall()
    # print(myresult)
    if myresult == []:
        client = random.randrange(1000000000, 9999999999)
        sql = "INSERT INTO mqttclient (client, uid) VALUES (%s, %s)"
        val = (client, uid)
        mycursor.execute(sql, val)
        bbd.commit()
        print("Inserted")
        mycursor.execute(
            "SELECT client,uid FROM `mqttclient` WHERE `uid` = "
            + uid
        )
        myresult = mycursor.fetchall()
        for line in myresult:
            return line[0]
    elif myresult != []:
        for line in myresult:
            return line[0]


def notify_error(bbd, message, separation):
    jjs = erreur.error()
    payload = message.payload.decode("utf-8")
    for line in jjs:
        if payload.startswith(line):
            pay = payload.split(separation)
            code_error = pay[0]
            client = pay[1]
            dateNow = datetime.datetime.now()
            titre = "MQTT"
            sql = "INSERT INTO notification (titre, text, type,icon,date,color) VALUES (%s, %s,%s, %s,%s, %s)"
            for value in jjs:
                if value == code_error:
                    key = jjs[value]
                    text = key["text"].format(client)
                    val = (
                        titre,
                        text,
                        key["types"],
                        "icons/{0}".format(key["icon"]),
                        dateNow,
                        key["color"],
                    )
                    mycursor = bbd.cursor()
                    mycursor.execute(sql, val)
                    bbd.commit()


def initListeObjet(bbd):
    mycursor = bbd.cursor()
    mycursor.execute("UPDATE `mqttclient` SET is_alive = 0")
    bbd.commit()
    print("all is_alive = 0")


def listeObjet(bbd, message):
    mycursor = bbd.cursor()
    mycursor.execute(
        "SELECT client,uid FROM `mqttclient` WHERE `uid` = "
        + message
    )
    myresult = mycursor.fetchall()
    # print(myresult)
    if myresult != []:
        val = (1, message)
        mycursor.execute(
            "UPDATE `mqttclient` SET is_alive = %s WHERE uid = %s",
            val,
        )
        bbd.commit()


def liste_code_in(bbd, code_in):
    mycursor = bbd.cursor()
    mycursor.execute("SELECT code_in FROM `mqttautom`")
    myresult = mycursor.fetchall()
    liste = []
    for result in myresult:
        for item in result:
            liste.append(item)
    return liste.count(code_in)


def affiche_client_att(bdd):
    try:
        mycursor = bdd.cursor()
        mycursor.execute(
            f"SELECT id,client,uid FROM mqttAttClient"
        )
        myresult = mycursor.fetchall()
        dis = {}
        i = 0
        for line in myresult:
            dis_1 = {
                "id_client": line[0],
                "client": line[1],
                "uid": line[2],
            }
            dis[str(i)] = dis_1
            i = i + 1
        return json.dumps(dis)
    except bdd.connector.errors.IntegrityError as e:
        return f"erreur_{e}"


def add_(bdd, separation_socket, id_att, topic, name=""):
    try:
        mycursor = bdd.cursor()
        mycursor.execute(
            f"SELECT id,client,uid FROM mqttAttClient WHERE id = {id_att}"
        )
        myresult = mycursor.fetchall()
        if name == "":
            name = myresult[0][1]
        uid = myresult[0][2]
        mycursor = bdd.cursor()
        mycursor.execute(
            f"INSERT INTO mqttclient (client,topic,uid,is_alive) VALUES ({name},{topic},{uid},{0})"
        )
        return f"exe{separation_socket}Client Mqtt Ajouter"
    except bdd.connector.errors.IntegrityError as e:
        return f"erreur_{separation_socket}{e}"


def add_client_att(bdd, uid, name=""):
    try:
        mycursor = bdd.cursor()
        mycursor.execute(
            f"INSERT INTO mqttAttClient (client,uid) VALUES ({name},{uid})"
        )
    except bdd.connector.errors.IntegrityError as e:
        return f"erreur_{e}"


def recherche_execute(bdd, allTopic):

    rek = """
            SELECT id,mqc_e.client,mqc.client,mqe.topic_ex,mqe.condition,mqe.function,mqe.value,mqc.uid,mqc_e.uid  FROM `mqttautom` as mqe 
            INNER JOIN `mqttclient` as mqc ON mqe.client_id_in = mqc.id_client
            INNER JOIN `mqttclient` as mqc_e ON mqe.client_id_ex = mqc_e.id_client 
            WHERE mqe.topic_in = '{0}'
        """.format(
        allTopic
    )

    mycursor = bdd.cursor()
    mycursor.execute(rek)
    myresult = mycursor.fetchall()
    if myresult != []:
        dis = {}
        i = 0
        for line in myresult:
            if line[6] == 1:
                value = True
            else:
                value = False
            dis_1 = {
                "id": line[0],
                "client_1": line[1],
                "client_2": line[2],
                "topic_ex": line[3].replace("uid", line[8]),
                "condition": line[4],
                "function": line[5],
                "value": value,
                "uid_in":  line[7],
                "uid_ex": line[8],
            }
            dis[str(i)] = dis_1
            i = i + 1
        # print(dis)
        return dis
    else:
        return ""


def execute(bdd, message, mqtt):
    splitTopic = message.topic.split("/")
    groupTopic = splitTopic[0]
    clientTopic = splitTopic[1]
    eventTopic = splitTopic[2]
    dataM = message.payload.decode("utf-8")
    rechercheExecute = recherche_execute(
        bdd, message.topic
    )
    if rechercheExecute != "":
        value_response = {}
        i = 0
        for key,value in rechercheExecute.items():
            # value = rechercheExecute[key]
            # print("key re",key,value)
            condition = json.loads(value["condition"]) 
            # print("Condition",condition)
            valueobj = condition[eventTopic]
            # print("je suis key dec",valueobj,eventTopic)
            valueM = json.loads(dataM)
            exe = executeConsition(
                bool(valueM["value"]),
                valueobj["condition"],
                value["value"],
            )
            envoyValue = {"value": exe}
            print("rest swich", globals()[value["function"]](bdd,value))
            dise = { value["topic_ex"] : envoyValue}
            value_response[str(i)] = dise
            i = i + 1
            mqtt.publish(value["topic_ex"], json.dumps(envoyValue), 0)
        print("resluta execut",value_response)


def swich(bdd,value):
    valuesta = value["value"]
    copievaluesta = value["value"]
    id = value["id"]
    if valuesta == True :
        copievaluesta = 0
        mycursor = bdd.cursor()
        mycursor.execute(
            "UPDATE `mqttautom` SET `value` = ? WHERE `id` = ?",
            (copievaluesta, id),
        )
        bdd.commit()
        return False
    elif valuesta == False :
        copievaluesta = 1
        mycursor = bdd.cursor()
        mycursor.execute(
            "UPDATE `mqttautom` SET `value` = ? WHERE `id` = ?",
            (copievaluesta, id),
        )
        bdd.commit()
        return True


def button(bdd,value):
    print()


def add_client(bdd, separation_socket, name, uid, topic=""):
    try:
        mycursor = bdd.cursor()
        mycursor.execute(
            f"INSERT INTO mqttclient (client,topic,uid,is_alive) VALUES ({name},{topic},{uid},{0})"
        )
        return f"exe{separation_socket}Client Mqtt Ajouter"
    except bdd.connector.errors.IntegrityError as e:
        return f"erreur_{separation_socket}{e}"


def update_client_name(bdd, separation_socket, name, uid):
    try:
        mycursor = bdd.cursor()
        mycursor.execute(
            f"UPDATE `mqttclient` SET `client`='{name}' WHERE `uid` = {uid}"
        )
    except bdd.connector.errors.IntegrityError as e:
        return f"erreur_{separation_socket}{e}"


def affiche_list_function(function):
    dis = {}
    dis_2 = {}
    disjson = erreur.config["mods"][function]
    if function == "swich":
        dis[function] = disjson
    if function == "button":
        dis[function] = disjson
    if function == "va&vi":
        dis[function] = disjson
    dis_2["mod"] = dis
    return json.dumps(dis_2)



def function_Update(bdd, id, object):
    print(
        f"UPDATE `mqttautom` SET `function`='{json.dumps(object)}' WHERE id = {int(id)}"
    )


def liste_client(mydb):
    mycursor = mydb.cursor()
    mycursor.execute(
        "SELECT id_client,topic,client,uid,is_alive,id_param,param,ip FROM `mqttclient`"
    )
    myresult = mycursor.fetchall()
    # print(myresult)
    dis = []
    for line in myresult:
        dis_1 = {
            "id_client": line[0],
            "topic": line[1],
            "client": line[2],
            "uid": line[3],
            "is_alive": bool(line[4]),
            "id_param": line[5],
            "param": json.loads(line[6]),
            "ip": line[7],
        }
        dis.append(dis_1);
    return json.dumps(dis)


def liste_cache(mydb):
    mycursor = mydb.cursor()
    mycursor.execute(
        "SELECT `id_topic`, `id_client`, `ressult` FROM `mqttcache`"
    )
    myresult = mycursor.fetchall()
    dis = []
    for lisCache in myresult:
        dis_1 = {
            "id_topic": lisCache[0],
            "id_client" : lisCache[1],
            "value": json.loads(lisCache[2]),
        }
        dis.append(dis_1);
    
    # print(json.dumps(dis))
    return json.dumps(dis)


def liste_topic(mydb):
    mycursor = mydb.cursor()
    mycursor.execute(
        "SELECT id_topic,topic,active FROM `mqtttopic`"
    )
    myresult = mycursor.fetchall()
    dis = []
    for line in myresult:
        dis_1 = {"id": line[0], "topic": line[1], "active": bool(line[2])}
        dis.append(dis_1);
    return json.dumps(dis)



# a voire
def liste_autom(mydb,id_=""):
    sqlValue = ""
    if id_ != "":
         sqlValue = sqlValue + f" WHERE id = {id_}"
    rek = f"""
            SELECT id,mqc.client,mqc_e.client,mqe.topic_in,mqe.topic_ex,mqe.condition,mqe.function,mqe.value,mqc.uid,mqc_e.uid   FROM `mqttautom` as mqe
            INNER JOIN `mqttclient` as mqc_e ON mqe.client_id_ex = mqc_e.id_client 
            INNER JOIN `mqttclient` as mqc ON mqe.client_id_in = mqc.id_client {sqlValue}
        """
    mycursor = mydb.cursor()
    mycursor.execute(rek)
    myresult = mycursor.fetchall()
    if myresult != []:
        dis = []
        for line in myresult:
            if line[7] == 1:
                value = True
            else:
                value = False
            dis_1 = {
                "id": line[0],
                "client_1": line[1],
                "client_2": line[2],
                "topic_in": line[3].replace("uid", line[8]),
                "topic_ex" : line[4].replace("uid", line[9]),
                "condition": json.loads(line[5]),
                "function": line[6],
                "value": value,
                "uid_in":  line[8],
                "uid_ex": line[9],
            }
            dis.append(dis_1)
        # print(dis)
        return json.dumps(dis)
    else:
        return json.dumps({"status" : 500, "message" : "pas de donne ou passe pas !"})


# a refaire
def add_autom(
    bdd,
    separation_socket,
    jsonString
):
    json_ = json.loads(jsonString)
    try:
        sql = f"SELECT id_client,uid FROM `mqttclient` WHERE client = '{json_['id_client_in']}'"
        mycursor = bdd.cursor()
        mycursor.execute(sql)
        myresult_client_in = mycursor.fetchall()

    except bdd.connector.errors.IntegrityError as e:
        return f"erreur_{separation_socket}{e}"
    try:
        sql = f"SELECT id_client,uid FROM `mqttclient` WHERE client = '{json_['id_client_ex']}'"
        mycursor = bdd.cursor()
        mycursor.execute(sql)
        myresult_client_ex = mycursor.fetchall()
    except bdd.connector.errors.IntegrityError as e:
        return f"erreur_{separation_socket}{e}"
    
    try:
        sql = f"""INSERT INTO mqttautom (topic_in,topic_ex,id_client_in,id_client_ex,condition,function) 
        VALUES ('{json_['topic_in']}','{json_['topic_ex']}',(SELECT id_client FROM `mqttclient` WHERE client = '{json_['id_client_in']}'),
        (SELECT id_client FROM `mqttclient` WHERE client = '{json_['id_client_ex']}'),'{json_['condition']}','{affiche_list_function(json_['function_'])}')"""
        mycursor = bdd.cursor()
        mycursor.execute(sql)
        bdd.commit()
        return (
            f"added{separation_socket}exe "
        )
    except bdd.connector.errors.IntegrityError as e:
        return f"erreur_{separation_socket}{e}"


def update_autom(bdd,payload):
    json_ = json.loads(payload)
    sqlValue = ""
    if json_['topic_in'] != "":
        sqlValue = sqlValue + f"`topic_in` = '{json_['topic_in']}',"
    if json_['topic_ex'] != "":
        sqlValue = sqlValue + f"`topic_ex` = '{json_['topic_ex']}',"
    if json_['id_client_in'] != "":
        sqlValue = sqlValue + f"`id_client_in` = '{json_['id_client_in']}',"
    if json_['id_client_ex'] != "":
        sqlValue = sqlValue + f"`id_client_ex` = '{json_['id_client_ex']}',"
    if json_['condition'] != "":
        sqlValue = sqlValue + f"`condition` = {json.dumps(json_['condition'])},"
    if json_['condition'] != "":
        sqlValue = sqlValue + f"`function` = {affiche_list_function(json['function_'])},"
    
    try:
        sql = f"UPDATE `mqttautom` SET {sqlValue} WHERE `id` = {json_['id']}"
        mycursor = bdd.cursor()
        mycursor.execute(sql)
        bdd.commit()
        return liste_autom(bdd, json_['id'])
    except bdd.connector.errors.IntegrityError as e:
        return f"erreur_"



def deleted_autom(mydb,separation_socket,id):
    try:
        sql = f"DELETE FROM `mqttautom` WHERE {id}"
        mycursor = mydb.cursor()
        mycursor.execute(sql)
        mydb.commit()
        return (
            f"exe{separation_socket}l'excution Mqtt Ajouter"
        )
    except mydb.connector.errors.IntegrityError as e:
        return f"erreur_{separation_socket}{e}"


def print_titreTopic(mydb):
    mycursor = mydb.cursor()
    mycursor.execute(
        "SELECT topic FROM `mqtttopic` WHERE active = 1"
    )
    myresult = mycursor.fetchall()
    text = []
    text.append("system/#")
    for topic in myresult:
        for item in topic:
            text.append(item)
    return text


def cache_topic(mydb, topic):
    mycursor = mydb.cursor()
    mycursor.execute(
        f"SELECT (SELECT client FROM `mqttclient` WHERE id_client =  mqca.id_client ) ,  mqca.ressult FROM mqttcache as mqca WHERE mqca.id_topic = (SELECT `id_topic` FROM `mqtttopic` WHERE `topic` = '{topic}')"
    )
    myresult = mycursor.fetchall()
    # print(myresult)
    dis = []
    for topic in myresult:
        dis_1 = {
            "client": topic[0],
            "value": json.loads(topic[1]),
        }
        dis.append(dis_1)
    return json.dumps(dis)


def is_exists_client(mydb, client):
    mycursor = mydb.cursor()
    mycursor.execute(
        "SELECT `client` FROM `mqttclient` WHERE `client` = '{0}'".format(
            client
        )
    )
    myresult = mycursor.fetchall()
    if myresult == []:
        print("client not found")
        return False
    else:
        print("client true")
        return True


def concat_liste(list):
    valueReturn = ""
    for value in list:
        valueReturn = valueReturn + value
        print(valueReturn)
    return valueReturn


def add_mqtt_param(mydb,separation_socket,name, param):
    try:
        sql = f"INSERT INTO `mqttparam` (`name_param`,`param`) VALUES ('{name}','{param}')"
        print(sql)
        mycursor = mydb.cursor()
        mycursor.execute(sql)
        mydb.commit()
        myresult = liste_param(mydb,"", name)
        return (
            f"added{separation_socket}{myresult}"
        )

    except mydb.connector.errors.IntegrityError as e:
        return f"erreur_{separation_socket}{e}"


def update_mqtt_param(mydb,separation_socket,jsonVal):
    try:
        print(jsonVal)
        keyandval = json.loads(jsonVal)
        print(keyandval["name_param"])
        print(keyandval)
        valueUpdate = ""
        if keyandval["name_param"] != "":
            valueUpdate = valueUpdate + f" `name_param` = '{keyandval['name_param']}', "
        if keyandval['param'] != "":
            valueUpdate = valueUpdate + f" `param` = '{json.dumps(keyandval['param'])}' "
        if valueUpdate != "":
            sql = f"UPDATE `mqttparam` SET {valueUpdate} WHERE `id_param` = {keyandval['id_param']}"
            print(sql)
        mycursor = mydb.cursor()
        mycursor.execute(sql)
        myresult = liste_param(mydb,keyandval['id_param'])
        mydb.commit()
        return (
            f"updated{separation_socket}{myresult}"
        )
    except mydb.connector.errors.IntegrityError as e:
        return f"erreur_{separation_socket}{e}"


def deleted_param(mydb,separation_socket,id):
    try:
        
        sql = f" DELETE FROM `mqttparam` WHERE `id_param` = {id}"
        mycursor = mydb.cursor()
        mycursor.execute(sql)
        mydb.commit()
        return (
            f"delete{separation_socket}param supprimer : ok"
        )
    except mydb.connector.errors.IntegrityError as e:
        return f"erreur_{separation_socket}{e}"


def liste_param(mydb, id = "", name = ""):
    mycursor = mydb.cursor()
    if name != "":
        sql = f"SELECT id_param,name_param,param FROM `mqttparam` WHERE `name_param` = '{name}'"
        print(sql)
    if id != "":
        sql = f"SELECT id_param,name_param,param FROM `mqttparam` WHERE `id_param` = {id}"
    elif id == "" and name == "":
        sql = "SELECT id_param,name_param,param FROM `mqttparam`"
    mycursor.execute(sql)
    myresult = mycursor.fetchall()
    dis = []
    if myresult != []:
        for line in myresult:
            dis_1 = {"id_param": line[0], "name_param": line[1], "param": json.loads(line[2])}
            dis.append(dis_1);
        print(json.dumps(dis))
        mydb.commit()
        return json.dumps(dis)
    else:
        return json.dumps({"status" : 500, "message" : "pas de donne ou passe pas !"})



def liste_exe(mydb,id = "", id_client_ = ""):
    try:
        if id != "":
            sql = f"SELECT id_exe,id_client,exe FROM `mqttexe` WHERE `id_exe` = {id}"
        elif id_client_ != "":
            sql = f"SELECT id_exe,id_client,exe FROM `mqttexe` WHERE `id_client` = {id_client_}"
        elif id_client_ == "" and id == "":
            sql = "SELECT id_exe,id_client,exe FROM `mqttexe`"
        mycursor = mydb.cursor()
        mycursor.execute(sql)
        myresult = mycursor.fetchall()
        dis = []
        if myresult != []:
            for line in myresult:
                dis_1 = {"id": line[0], "id_client": line[1], "exe": json.loads(line[2])}
                dis.append(dis_1);
        print(json.dumps(dis))
        return json.dumps(dis)
    except mydb.connector.errors.IntegrityError as e:
        return e


def add_exe(mydb,separation_socket,payload):
    data = json.loads(payload)
    id_client = data["id_client"]
    exe_ = json.dumps(data["exe"])
    try:
        sql = f"INSERT INTO `mqttexe` (`id_client`,`exe`) VALUES ('{id_client}','{exe_}')"
        print(sql)
        mycursor = mydb.cursor()
        mycursor.execute(sql)
        mydb.commit()
        myresult = liste_exe(mydb,"",id_client)
        return (
            f"added{separation_socket}{myresult}"
        )
    except mydb.connector.errors.IntegrityError as e:
        return f"erreur_{separation_socket}{e}"


def update_exe(mydb,separation_socket,payload):
    data = json.loads(payload)
    valuesql = ""
    if data["id_client"] != "":
        valuesql = valuesql + f"`id_client` = '{valuesql['id_client']}',"
    if data["exe"] != "":
        valuesql = valuesql + f"`exe` = '{valuesql['exe']}',"
    try:
        sql = f"UPDATE `mqttexe` SET {valuesql} WHERE `id_exe` = {data['id_exe']}"
        print(sql)
        mycursor = mydb.cursor()
        mycursor.execute(sql)
        mydb.commit()
        myresult = liste_exe(mydb,data['id_exe'])
        return (
            f"update{separation_socket}{myresult}"
        )
    except mydb.connector.errors.IntegrityError as e:
        return f"erreur_{separation_socket}{e}"


def deleted_exe(mydb,separation_socket,id):
    try:
        sql = f"DELETE FROM `mqttexe` WHERE `id_exe` = {id}"
        mycursor = mydb.cursor()
        mycursor.execute(sql)
        mydb.commit()
        return (
            f"delete{separation_socket}param supprimer : ok"
        )
    except mydb.connector.errors.IntegrityError as e:
        return f"erreur_{separation_socket}{e}"
