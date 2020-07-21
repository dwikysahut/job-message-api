# Job Board API
Job Board api was a RESTfull API built with Node.js using the Express.js Framework. also Sequelize js  [Explore More Sequelize.js](https://sequelize.org/). and then Express.js is one of the popular web frameworks in the Node.js .  [Explore More Express.js](https://en.wikipedia.org/wiki/Express.js). This RESTful API was tested using mocha and chai and istanbul code coverage

## Built With
[![Express.js](https://img.shields.io/badge/Express.js-4.17.1-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html)
[![Node.js](https://img.shields.io/badge/Node.js-v12.16.2-green.svg?style=rounded-square)](https://nodejs.org/)
[![Sequelize.js](https://img.shields.io/badge/Sequelize.js-v6.3.3-blue.svg?style=rounded-square)](https://sequelize.org/)


## Requirements
1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. database (Mysql)
3. <a href="https://www.getpostman.com/">Postman</a>
4. Web Server (ex. localhost)

## Getting Started

The concept of this application is that user get a Job message from request which the priority by location, availibily and ratings. where at login will be distinguished using authorization with JWT.

In this project I use the Morgan package which serves as recording every request to the server.

Here to Use Morgan
```
var express = require('express')
var morgan  = require('morgan')
 
var app = express()
app.use(morgan())
```
and then there is a nodemon package to automatically restart the app node when our code changes so there is no need to restart manually

```
npm install -g nodemon

```
If use yarn


```
yarn add -g nodemon

```

Usage For Development

Clone this repository, then :
1. Open app's directory in CMD or Terminal
2. Type `npm install` or `yarn install`
3. Make new file a called **.env**, set up first [here](#set-up-env-file)
4. Turn on Web Server and MySQL can using Third-party tool like xampp, etc.
5. Create a database with the name libraryapp-api, and Import file [job_board_apiapi.sql](libraryapp-api.sql) to **phpmyadmin**
6. Open Postman desktop application or Chrome web app extension that has installed before
7. Choose HTTP Method and enter request url.(ex. localhost:8080/book)
8. You can see all the end point [here](#end-point)

if use yarn , type this to start server


```
yarn start



```
this package use for upload image with multer


```
yarn add multer

```

## Set up .env file
Open .env file on your code editor, and copy paste this code below :
```
SECRET_KEY=passwordkuaneh
REFRESH_TOKEN_SECRET=anehpasswordku

PORT = YOUR_CHOOSEN_PORT
DB_HOST= localhost
DB_USER= root
DB_PASSWORD=
DB_DATABASE= libraryapp-api
  
```

## Start Coverage
  
for star coverage 

```
yarn cover

``` 

## End Point


first, the token can get from login.
and then copy that token.
**GET**
* `/job`
in headers add this:
```
key                                 value
Authorization                    paste token here

``` 



GET Job response

```
 {
    "status": 200,
    "data": {
        "id": 1,
        "user_id": 2,
        "name": "programmer",
        "location": "malang",
        "availability": "yes",
        "isClaimed": "false",
        "createdAt": "2020-07-20T21:10:28.000Z",
        "updatedAt": "2020-07-21T14:35:56.000Z"
    }
}
```


**PUT**
* `/job/:id`

in headers add this:
```
key                                 value
Authorization                    paste token here

``` 

and then at body
```
key                                 value
isClaimed                        fill with true/false

``` 
if true , the job is not available again for another user

```
{
    "status": 200,
    "data": {
        "id": 1,
        "user_id": null,
        "name": "programmer",
        "location": "malang",
        "availability": "yes",
        "isClaimed": "false",
        "createdAt": "2020-07-20T21:10:28.000Z",
        "updatedAt": "2020-07-21T14:36:09.000Z"
    }
}
```

   

# Packages
- express
- mysql
- mysql2
- body-parser
- morgan
- multer
- nodemon
- cors
- jsonwebtoken
- bcrypt
- dotenv
- sequelize

## Authors

* Dwiky satria hutomo

http://github.com/dwikysahut

