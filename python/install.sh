#! /bin/bash
# install system 
apt install python3-pip -y
pip install paho-mqtt -y
cp mqtt_server.service /etc/systemd/system
systemctl enable mqtt_server.service
