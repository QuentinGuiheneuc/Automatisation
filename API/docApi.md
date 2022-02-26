# Doc API

## Route

### param

- GET
  - Return
  ```js
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
- POST

  ```js
    param: {"id_param": 1, "name_param": "wleds", "param": {"value": 280}
  ```

  - Return

    ```js
    l'ajout du param : ok
    ```

- PATCH

  ```js
  param: {"id_param": 1, "name_param": "wleds", "param": {"value": 280}
  ```

  - Return

  ```
    mise a jour du param : ok
  ```

- DELETE
  ```js
  ?id=1
  ```
  - Return
  ```js
  param supprimer : ok
  ```
