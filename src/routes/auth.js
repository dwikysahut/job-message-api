const express = require('express');
const Route = express.Router();
const authController = require('../controllers/auth')

const { authorizationRefreshtoken } = require('../middleware/auth')


Route

// .put('/admin', authController.postAdmin)
    .get('/user',authController.getUser)
    .post('/register', authController.postRegister)
    .post('/login', authController.postLogin)
    .post('/token', authorizationRefreshtoken,authController.getToken)
module.exports = Route