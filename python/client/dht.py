import Adafruit_DHT
import time
def dth(config,mqtt):
    while():
        humidity,temperature = Adafruit_DHT.read_retry(config["dht"]["dht"], config["dht"]["pin"])
        print(humidity, temperature)
        time.sleep(2000)