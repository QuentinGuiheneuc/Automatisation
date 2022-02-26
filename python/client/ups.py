# mudule for ups
#  crée par Quentin Guiheneuc
import os,time,json

def upsexecut(mqttc,config,Topic):
    '''
    @mqttc 
    @config ups
    '''
    while True:
        upstatus = upslecture(config["ups"]["name"],config["ups"]["host"])
        print(upstatus)
        mqttc.publish(Topic,f"{upstatus}")
        time.sleep(3)

def upslecture(name,host):
    '''
    @name name UPS 
    @host host HOST
    @return = dis
    '''

    os.system(f'upsc {name}@{host} > ups.txt')
    host = open("ups.txt", "r")
    dis1 = {}
    for line in host:
        resultsplit = line.split(":")
        stri = resultsplit[1].lstrip()
        stri1 = stri.replace("\n","")
        dis1[resultsplit[0]] = stri1
    return json.dumps(dis1)
