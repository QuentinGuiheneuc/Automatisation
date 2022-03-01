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
