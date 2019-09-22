# Backend


# Register

If you need to Register a User use the following information.

**URL** : `https://kickstarter-backend.herokuapp.com/api/auth/register`

**Method** : `POST`

**Auth required** : NO

**Data constraints**

```json
{
    "username": "[A unique username]",
    "password": "[password in plain text]"
}
```

**Data example**

```json
{
    "username": "admin",
    "password": "password"
}
```

## Success Response

**Code** : `201 Created`

**Content example**

The password that is returned is a hash and not a representation of something that you should use.  

```json
{
    "id": 2,
    "username": "[username]",
    "password": "93144b288eb1fdccbe46d6fc0f241a51766ecd3d"
}
```
## Error Response

**Condition** : If 'username' is already taken.

**Code** : `500 BAD REQUEST`

**Content** :

```json
{
    
    "name": "error",
    "length": 212,
    "severity": "ERROR",
    "code": "23505",
    "detail": "Key (username)=([username]) already exists.",
    "schema": "public",
    "table": "users",
    "constraint": "users_username_unique",
    "file": "nbtinsert.c",
    "line": "534",
    "routine": "_bt_check_unique"

}
```

## Error Response

**Condition** : If 'username' and 'password' combination isn't send.

**Code** : `500 BAD REQUEST`

**Content** :

```json
{
    "error"
}
```


# Login

If you need to log a User in use the following information.

**URL** : `https://kickstarter-backend.herokuapp.com/api/auth/login/`

**Method** : `POST`

**Auth required** : NO

**Data constraints**

```json
{
    "username": "[valid username]",
    "password": "[password in plain text]"
}
```

**Data example**

```json
{
    "username": "admin",
    "password": "password"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "message": "Welcome [username]!",
    "token": "93144b288eb1fdccbe46d6fc0f241a51766ecd3d"
}
```

## Error Response

**Condition** : If 'username' and 'password' combination is wrong.

**Code** : `401 BAD REQUEST`

**Content** :

```json
{
    "message": "Invalid Credentials"
}
```


# Change a Password

If you need to change a password use the following information. Use the id of the user that is currently logged in to make the change.

**URL** : `https://kickstarter-backend.herokuapp.com/api/auth/update/:id`

**Method** : `PUT`

**Auth required** : YES

**Data constraints**

```json
{
    "username": "[Valid username that has not been changed]",
    "password": "[New Password]"
}
```

**Data example**

```json
{
    "username": "admin",
    "password": "newPassword"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```
1
```

## Error Response

**Condition** : If token isn't valid or you sent an invalid login pair.

**Code** : `401 Unauthorized`

**Content** :

```json
{
    "message": "Invalid Login or Token Expired."
}
```



# Delete a User

If you need to change remove a user for any reason.

**URL** : `https://kickstarter-backend.herokuapp.com/api/auth/delete/:id`

**Method** : `DELETE`

**Auth required** : YES

**Data constraints**

```json
{
    "username": "[Valid username that has not been changed]",
    "password": "[New Password]"
}
```

**Data example**

```json
{
    "username": "admin",
    "password": "newPassword"
}
```

## Success Response

**Code** : `204 No Content`

**Content example**

```
None
```

## Error Response

**Condition** : If token isn't valid or you sent an invalid login pair.

**Code** : `401 Unauthorized`

**Content** :

```json
{
    "message": "Invalid Login or Token Expired."
}
```


# Get User by ID

If you need to Register a User use the following information.

**URL** : `https://kickstarter-backend.herokuapp.com/api/auth/:id`

**Method** : `GET`

**Auth required** : YES

## Success Response

**Code** : `200 OK`

**Content example**

Grabbing a single User will also give you their kickstarters. 

```json
{
    "id": 1,
    "username": "admin",
    "password": "$2a$08$1E8f0RFjlf30c2CL0SRD5eSWJ6EcSvAI5lTsq.GyLacwT8/2iZQkm",
    "kickstarter": [
        {
            "id": 1,
            "user_id": 1,
            "campaignName": "Test_Project_1",
            "categories": "Games",
            "description": "Put the decription here and bla bla bla.",
            "monetaryGoal": 100000,
            "duration": 30,
            "country": "USA"
        },
        {
            "id": 2,
            "user_id": 1,
            "campaignName": "Test_Project_2",
            "categories": "Games",
            "description": "Put the decription here and bla bla bla.",
            "monetaryGoal": 100000,
            "duration": 30,
            "country": "CHINA"
        },
        {
            "id": 3,
            "user_id": 1,
            "campaignName": "Test_Project_3",
            "categories": "Games",
            "description": "Put the decription here and bla bla bla.",
            "monetaryGoal": 100000,
            "duration": 30,
            "country": "RUSSIA"
        },
        {
            "id": 4,
            "user_id": 1,
            "campaignName": "Test_Project_4",
            "categories": "Games",
            "description": "Put the decription here and bla bla bla.",
            "monetaryGoal": 100000,
            "duration": 30,
            "country": "JAPAN"
        }
    ]
}
```
## Error Response

**Condition** : If an incorrect ID is give.

**Code** : `500 BAD REQUEST`

**Content** : None, Working on that.

## Error Response

**Condition** : If token isn't valid or you sent an invalid login pair.

**Code** : `401 Unauthorized`

**Content** :

```json
{
    "message": "Invalid Login or Token Expired."
}
```

# Get a list of all Users

If you need to Register a User use the following information.

**URL** : `https://kickstarter-backend.herokuapp.com/api/auth/`

**Method** : `GET`

**Auth required** : YES

## Success Response

**Code** : `201 OK`

**Content example**

Grabbing a single User will also give you their kickstarters. 

```json
{
   [
    {
        "id": 1,
        "username": "admin",
        "password": "$2a$08$1E8f0RFjlf30c2CL0SRD5eSWJ6EcSvAI5lTsq.GyLacwT8/2iZQkm"
    },
    {
        "id": 4,
        "username": "Test2",
        "password": "$2a$08$nauzqJ4ZHsWcPG9148fmS.uBrLE0G3VTJUvVg8FkmxLlQzaFxb3F6"
    },
    {
        "id": 5,
        "username": "Test3",
        "password": "$2a$08$1tGRKflHEVqEhfJq2lZZn.PM/jcDEYAKNRzcYzmmdUGCaU0IEvsoO"
    },
    {
        "id": 6,
        "username": "Test4",
        "password": "$2a$08$AIXiylnFh/kJVPxQE15soOQ6fPrFCh99HPeJ04I7I3QHtr/gL0R2e"
    }
   ]
}
```
## Error Response

**Condition** : If token isn't valid or you sent an invalid login pair.

**Code** : `401 Unauthorized`

**Content** :

```json
{
    "message": "Invalid Login or Token Expired."
}
```