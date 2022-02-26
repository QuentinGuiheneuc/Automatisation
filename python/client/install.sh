#! /bin/bash
# install system 
apt install python3-pip
pip3 install paho-mqtt
cp mqtt_client.service /etc/systemd/system
systemctl enable mqtt_client.service
