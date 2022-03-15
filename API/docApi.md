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

### meteo

- GET

  ```js
    /meteo
  ```

  - return

    ```js
      [
        {
            "id_insee": 1,
            "nom": "L'Abergement-Clémenciat",
            "codeDepartement": "01",
            "codesPostaux": "01400",
            "insee": "01001"
        },
        {
            "id_insee": 2,
            "nom": "L'Abergement-de-Varey",
            "codeDepartement": "01",
            "codesPostaux": "01640",
            "insee": "01002"
        },
        ...
      ]

    ```

  ```js
    /meteo/search?search=Bordea
  ```

  - return

    ```js
      [
        {
            "id_insee": 12325,
            "nom": "Artigues-près-Bordeaux",
            "codeDepartement": "33",
            "codesPostaux": "33370",
            "insee": "33013"
        },
        {
            "id_insee": 12374,
            "nom": "Bordeaux",
            "codeDepartement": "33",
            "codesPostaux": "33000",
            "insee": "33063"
        },
        ...
      ]
    ```

  ```js
    /meteo/donner
  ```

  - return

    ```js
      {
    "city": {
        "insee": "33063",
        "cp": 33000,
        "name": "Bordeaux",
        "latitude": 44.8572,
        "longitude": -0.5737,
        "altitude": 9
    },
    "ephemeride": {
        "latitude": 44.8572,
        "longitude": -0.5737,
        "insee": "33063",
        "day": 0,
        "datetime": "2022-03-14T00:00:00+0100",
        "sunrise": "07:14",
        "sunset": "19:08",
        "duration_day": "11:54",
        "diff_duration_day": 4,
        "moon_age": 10.5,
        "moon_phase": "Lune gibbeuse croissante"
    },
    "forecast": [
        {
          "insee": "33063",
          "cp": 33000,
          "latitude": 44.8572,
          "longitude": -0.5737,
          "day": 0,
          "datetime": "2022-03-14T01:00:00+0100",
          "wind10m": 20,
          "gust10m": 57,
          "dirwind10m": 108,
          "rr10": 1.5,
          "rr1": 3.1,
          "probarain": 80,
          "weather": 4,
          "tmin": 5,
          "tmax": 16,
          "sun_hours": 1,
          "etp": 1,
          "probafrost": 10,
          "probafog": 0,
          "probawind70": 0,
          "probawind100": 0,
          "gustx": 59
        },
        ...
        ]
      }
    ```

  ```js
    /meteo/param
  ```

  - return

    ```js
    [
      {
        nom: "Bordeaux",
        codeDepartement: "33",
        codesPostaux: "33000",
        insee: "33063",
      },
    ];
    ```
