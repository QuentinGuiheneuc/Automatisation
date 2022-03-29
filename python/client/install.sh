#! /bin/bash
# install system 
sudo apt-get update -y
apt install python3-pip
pip3 install paho-mqtt
pip install wiringpi


apt-get install build-essential python-dev python-openssl git 
git clone https://github.com/adafruit/Adafruit_Python_DHT.git && cd Adafruit_Python_DHT
python3 setup.py install

cp mqtt_client.service /etc/systemd/system
systemctl enable mqtt_client.service
