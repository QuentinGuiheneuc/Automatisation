#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import json
import random
import datetime
import erreur



def lire_fichier(fichier):
    if is_fichier(fichier):
        with open(fichier, "r") as fichiers:
            return fichiers.read()
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
            sql = "SELECT id_client FROM `mqttcache` WHERE `id_client` = (SELECT id_client FROM `mqttclient` WHERE client = '{0}')".format(
                clientTopic
            )
            mycursor.execute(sql)
            myresult = mycursor.fetchall()
            # print(myresult)
            if myresult != []:
                sql = f"UPDATE `mqttcache` SET `ressult`='{payload}' WHERE `id_client` = (SELECT id_client FROM `mqttclient` WHERE client = '{clientTopic}')"
                print("UPDATE \n")
                mycursor.execute(sql)
                bbd.commit()
            else:
                sql = f"INSERT INTO `mqttcache`(`id_topic`, `id_client`, `ressult`) VALUES ((SELECT id_topic FROM `mqtttopic` WHERE topic = '{groupTopic}/#'),(SELECT id_client FROM `mqttclient` WHERE client = '{clientTopic}'), '{payload}')"
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
    mycursor.execute("SELECT code_in FROM `mqttexecut`")
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
            SELECT id,mqc_e.client,mqc.client,mqe.topic_ex,mqe.condition,mqe.function,mqe.value  FROM `mqttexecut` as mqe 
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
                "topic_ex": line[3],
                "condition": line[4],
                "function": line[5],
                "value": value,
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
    bdd.close()


def swich(bdd,value):
    valuesta = value["value"]
    copievaluesta = value["value"]
    id = value["id"]
    if valuesta == True :
        copievaluesta = 0
        mycursor = bdd.cursor()
        mycursor.execute(
            "UPDATE `mqttexecut` SET `value` = ? WHERE `id` = ?",
            (copievaluesta, id),
        )
        bdd.commit()
        return False
    elif valuesta == False :
        copievaluesta = 1
        mycursor = bdd.cursor()
        mycursor.execute(
            "UPDATE `mqttexecut` SET `value` = ? WHERE `id` = ?",
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


def add_execut(
    bdd,
    separation_socket,
    code_in="",
    code_ex="",
    topic_in="",
    topic_ex="",
    id_client_in="",
    id_client_ex="",
    condition="",
    function_="",
):
    try:
        sql = f"""INSERT INTO mqttexecut (code_in,code_ex,topic_in,topic_ex,id_client_in,id_client_ex,condition,function) 
        VALUES ('{code_in}','{code_ex}','{topic_in}','{topic_ex}',(SELECT id_client FROM `mqttclient` WHERE client = '{id_client_in}'),
        (SELECT id_client FROM `mqttclient` WHERE client = '{id_client_ex}'),'{condition}','{affiche_list_function(function_)}')"""
        mycursor = bdd.cursor()
        mycursor.execute(sql)
        
        return (
            f"exe{separation_socket}l'excution Mqtt Ajouter"
        )
    except bdd.connector.errors.IntegrityError as e:
        return f"erreur_{separation_socket}{e}"


def function_Update(bdd, id, object):
    print(
        f"UPDATE `mqttexecut` SET `function`='{json.dumps(object)}' WHERE id = {int(id)}"
    )


def liste_client(mydb):
    mycursor = mydb.cursor()
    mycursor.execute(
        "SELECT id_client,topic,client,uid,is_alive FROM `mqttclient`"
    )
    myresult = mycursor.fetchall()
    # print(myresult)
    dis = {}
    i = 0
    for line in myresult:
        dis_1 = {
            "id_client": line[0],
            "topic": line[1],
            "client": line[2],
            "uid": line[3],
            "is_alive": bool(line[4]),
        }
        dis[str(i)] = dis_1
        i = i + 1
    
    return json.dumps(dis)


def liste_cache(mydb):
    mycursor = mydb.cursor()
    mycursor.execute(
        "SELECT `id_topic`, `id_client`, `ressult` FROM `mqttcache`"
    )
    myresult = mycursor.fetchall()
    dis = {}
    i = 0
    for lisCache in myresult:
        dis_1 = {
            "id_topic": lisCache[0],
            "id_client" : lisCache[1],
            "value": json.loads(lisCache[2]),
        }
        dis[str(i)] = dis_1
        i += 1
    # print(json.dumps(dis))

    return json.dumps(dis)


def liste_topic(mydb):
    mycursor = mydb.cursor()
    mycursor.execute(
        "SELECT id_topic,topic FROM `mqtttopic` WHERE active = 1"
    )
    myresult = mycursor.fetchall()
    dis = {}
    i = 0
    for line in myresult:
        dis_1 = {"id": line[0], "topic": line[1]}
        dis[str(i)] = dis_1
        i = i + 1
    return json.dumps(dis)


def liste_execute(mydb):
    rek = """
            SELECT id,mqc.client,mqc_e.client,mqe.topic_in,mqe.topic_ex,mqe.condition,mqe.function,mqe.value  FROM `mqttexecut` as mqe
            INNER JOIN `mqttclient` as mqc_e ON mqe.client_id_ex = mqc_e.id_client 
            INNER JOIN `mqttclient` as mqc ON mqe.client_id_in = mqc.id_client
        """
    mycursor = mydb.cursor()
    mycursor.execute(rek)
    myresult = mycursor.fetchall()
    if myresult != []:
        dis = {}
        i = 0
        for line in myresult:
            if line[7] == 1:
                value = True
            else:
                value = False
            dis_1 = {
                "id": line[0],
                "client_1": line[1],
                "client_2": line[2],
                "topic_in": line[3],
                "topic_ex" : line[4],
                "condition": json.loads(line[5]),
                "function": line[6],
                "value": value,
            }
            dis[str(i)] = dis_1
            i = i + 1
        # print(dis)
        return json.dumps(dis)
    else:
        return "pas de donne ou passe pas !"

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


def cache_topic(mydb, topic, separation):
    mycursor = mydb.cursor()
    mycursor.execute(
        f"SELECT (SELECT client FROM `mqttclient` WHERE id_client =  mqca.id_client ) ,  mqca.ressult FROM mqttcache as mqca WHERE mqca.id_topic = (SELECT `id_topic` FROM `mqtttopic` WHERE `topic` = '{topic}')"
    )
    myresult = mycursor.fetchall()
    # print(myresult)
    dis = {}
    i = 0
    for topic in myresult:
        dis_1 = {
            "client": topic[0],
            "value": json.loads(topic[1]),
        }
        dis[str(i)] = dis_1
        i += 1
    # print(json.dumps(dis))

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