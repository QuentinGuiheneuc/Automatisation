import json

def lire_fichier_Json(fichier):
    with open(fichier) as fichiers:
        return json.load(fichiers)

config = lire_fichier_Json("config.json")

def list_error(code_in):
    list = []
    for code in error():
        list.append(code)
    return not list.count(code_in)

def error():
    return lire_fichier_Json(config["mysql"]["path_list_erreurs"])