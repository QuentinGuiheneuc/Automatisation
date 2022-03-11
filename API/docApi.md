# Doc API

## Route

### param

- GET

  - Return

  ```js
  /param

  [
      {
          "id_param": 1,
          "name_param": "wleds",
          "param": {
              "value": 280
          }
      },
      ...
  ]
  ```

  ```js
  /param/:id

  [
     {
         "id_param": 1,
         "name_param": "wleds",
         "param": {
             "value": 280
         }
     }
  ]
  ```

- POST

  ```js
    param: {
      "name_param": "wleds",
      "param": {"value": 280}
      }
  ```

  - Return

    ```js
    [
      {
        id_param: 24,
        name_param: "qtcg",
        param: {},
      },
    ];
    ```

- PATCH

  ```js
  param: {"id_param": 1, "name_param": "wleds", "param": {"value": 280}
  ```

  - Return
    mise a jour du param

  ```js
  [
    {
      id_param: 8,
      name_param: "wledtyty",
      param: {},
    },
  ];
  ```

- DELETE

  - Return

  ```js
  /param/:id

  param supprimer : ok
  ```

### autom

- GET

  - Return

  ```js
  /autom

  [
      {
      "id": 1,
      "id_client_in": "mqtt_Temps_Salon",
      "id_client_ex": "mqtt_test1",
      "topic_in": "prise",
      "topic_ex": "eclairage",
      "condition": {
        "humiditte": {
          "condition": "<",
          "value": "21"
          }
      },
      "function": "swich",
      "value": false,
      "uid_in": "1523698745",
      "uid_ex": "7894561230"
      },
      ...
  ]
  ```

  ```js
  /autom/:id

  [
      {
        "id": 1,
        "id_client_in": "mqtt_Temps_Salon",
        "id_client_ex": "mqtt_test1",
        "topic_in": "prise",
        "topic_ex": "eclairage",
        "condition": {
          "humiditte": {
            "condition": "<",
            "value": "21"
            }
        },
        "function": "swich",
        "value": false,
        "uid_in": "1523698745",
        "uid_ex": "7894561230"
      }
  ]
  ```

- POST

  ```js
  /autom
    param: {
      "id_client_in": "mqtt_Temps_Salon",
      "id_client_ex": "mqtt_test1",
      "topic_in": "prise",
      "topic_ex": "eclairage",
      "condition": {
        "humiditte": {
          "condition": "<",
          "value": "21"
          }
      },
      "function": "swich",
      "value": false,
      "uid_in": "1523698745",
      "uid_ex": "7894561230"
      }
  ```

  - Return

    ```js
    [
      {
        id: 8,
        id_client_in: "mqtt_Temps_Salon",
        id_client_ex: "mqtt_test1",
        topic_in: "prise",
        topic_ex: "eclairage",
        condition: {
          humiditte: {
            condition: "<",
            value: "21",
          },
        },
        function: "swich",
        value: false,
        uid_in: "1523698745",
        uid_ex: "7894561230",
      },
    ];
    ```

- PATCH

  ```js
  /autom
  param: {
      "id": 1,
      "id_client_in": "mqtt_Temps_Salon",
      "id_client_ex": "mqtt_test1",
      "topic_in": "prise",
      "topic_ex": "eclairage",
      "condition": {
      "humiditte": {
        "condition": "<",
        "value": "21"
        }
      },
      "function": "swich",
      "value": false,
      "uid_in": "1523698745",
      "uid_ex": "7894561230"
      }
  ```

  - Return

    ```js
    [
      {
        id: 1,
        id_client_in: "mqtt_Temps_Salon",
        id_client_ex: "mqtt_test1",
        topic_in: "prise",
        topic_ex: "eclairage",
        condition: {
          humiditte: {
            condition: "<",
            value: "21",
          },
        },
        function: "swich",
        value: false,
        uid_in: "1523698745",
        uid_ex: "7894561230",
      },
    ];
    ```

  ```

  ```

- DELETE

  - Return

    ```js
      /autom/:id

      autom supprimer : ok
    ```

### exe

- GET

  - Return

  ```js
  /autom

  [
    {
      "id": 1,
      "id_client": 1,
      "exe": {}
    },
    ...
  ]
  ```

  ```js
  /autom/:id

  [
    {
      "id": 1,
      "id_client": 1,
      "exe": {}
    }
  ]
  ```

- POST

  ```js
  /autom
    param: {
    "id_client": 1,
    "exe": {}
    }
  ```

  - Return

    ```js
    [
      {
        id: 1,
        id_client: 1,
        exe: {},
      },
    ];
    ```

- PATCH

  ```js
  /autom
  param:
  {
    "id": 1,
    "id_client": 1,
    "exe": {}
  }
  ```

  - Return

    ```js
    [
      {
        id: 1,
        id_client: 1,
        exe: { value: true },
      },
    ];
    ```

- DELETE

  - Return

    ```js
      /autom/:id

      autom supprimer : ok
    ```

### user

- GET
  ```
  /users
  ```
  - return
    ```js
    [
      {
          "id_user": 1,
          "nom": "Guiheneuc",
          "prenom": "Quentin",
          "mail": "guiheneuc.quentin@outlook.fr",
          "path_img": "/Dashbord/upload/DfkhrO1XUAEYkdw.jpg",
          "type": "admin"
      },
      ...
    ]
    ```
  ```
  /users/:id
  ```
  - return
    ```js
    [
      {
        id_user: 1,
        nom: "Guiheneuc",
        prenom: "Quentin",
        mail: "guiheneuc.quentin@outlook.fr",
        path_img: "/Dashbord/upload/DfkhrO1XUAEYkdw.jpg",
        type: "admin",
      },
    ];
    ```
- POST

  ```
    /users
    body
    user = "mail"
    passeword = "passeword"
  ```

  - return
    ```js
    [
      {
        id_user: 1,
        nom: "Guiheneuc",
        prenom: "Quentin",
        mail: "guiheneuc.quentin@outlook.fr",
        path_img: "/Dashbord/upload/DfkhrO1XUAEYkdw.jpg",
        type: "admin",
      },
    ];
    ```

### notification

- GET

  ```
  /notification
  ```

  - return
    ```js
        [
          {
              "id_notif": 45,
              "text": "testtext",
              "type": "typetext",
              "icon": "/icon.png",
              "date": "2022-03-11T20:48:38.000Z",
              "color": "#51FF0D"
          },
          ...
      ]
    ```

```
  /notification/:id
```

- return
  ```js
  [
    {
      id_notif: 45,
      text: "testtext",
      type: "typetext",
      icon: "/icon.png",
      date: "2022-03-11T20:48:38.000Z",
      color: "#51FF0D",
    },
  ];
  ```
- POST

  ```
  /notification
  body
  titre = testtext
  text = testtext
  type = typetext
  icon = /icon.png
  color = #51FF0D
  ```

  - return
    ```js
    {
        "affectedRows": 1,
        "insertId": 45,
        "warningStatus": 0
    }
    ```

- DELETE

  ```
  /notification/:id
  ```

  ```
  /notification/all
  ```
