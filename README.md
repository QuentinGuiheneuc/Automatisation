# Projet Domotique

## API

- Warning use of server Mqtt and DB and service of the python use Socket. to configure of environment.
- Config BD
  ```
   HOSTBD="ip BD"
   PORTBD=3306
   PASSWDBD="password BD"
   DATABASEBD="bbd_projet"
  ```
- Config Python
  ```
  HOSTSERVERPYTHON="ip of python"
  PORTSERVERPYTHON=65000
  SEPARATORSERVERPYTHON=";"
  ```
- Config serveur API
  ```
  HOST="localhost"
  PORT=3007
  ```
- Start
  ```
  ~/API
  npm install
  npm start
  ```

## Python

- Warning use of server Mqtt and DB. to configure of file config.json
- Start

  ```
  ~/python
  chmod +x install
  ./install
  systemctl start mqtt_server.service

  ```

## Web

- Warning use of server of API. to configure
- Start
  - Start
  ```
  ~/web
  yarn install
  yarn start
  ```
