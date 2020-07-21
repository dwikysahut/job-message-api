const authModels = require('../models/authModel')

const helper = require('../helpers')
const jwt = require('jsonwebtoken')
// const md5 = require('md5');
const bcrypt = require("bcrypt");
require('dotenv').config()
const refreshTokens = []
module.exports = {

    getUser: async function(request, response) {
        try {
            const result = await authModels.findAll();

            return helper.response(response, 200, result)

        } catch (error) {
            console.log(error)

            return helper.response(response, 500, error)

        }

    },
    postRegister: async function(request, response) {
        try {


            const setData = request.body
            const emailExist = await authModels.findOne({ where: {username: setData.username} })
            console.log('ssss')
            console.log(emailExist)
            if (emailExist === undefined||emailExist===null) {
              
                setData.password = bcrypt.hashSync(request.body.password,10)
                const result = await authModels.create(setData)
                return helper.response(response, 200, result)


            }
            return helper.response(response, 400, { meessage: "email has taken" })
        } catch (error) {
            console.log(error)
            return helper.response(response, 500, error)

        }

    },
    postLogin: async function(request, response) {
        try {
            const getData = request.body
            getData.password = request.body.password;
            const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
            //  const refreshTokens = [];
            console.log(getData.username)

            // console.log(getData.password)
        
            const result = await authModels.findOne({ where: {username:getData.username} })
            // console.log(result)
            // const compare = bcrypt.compareSync(getData.password, result.password);
    
            if (result === undefined||result===null) {
                return helper.response(response, 401, { message: "username is incorrect" })

            } 
            else if (!bcrypt.compareSync(getData.password, result.password)) {
                return helper.response(response, 401, { message: "password is incorrect" })

            } 
            
            else {
                //token structure: header,payload,verify signature
                const token = jwt.sign({ result }, process.env.SECRET_KEY, { expiresIn: '1d' })
                const refreshToken = jwt.sign({ result }, refreshTokenSecret,{ expiresIn: '20h'})
                const newData = {
                    result,
                    token,
                    refreshToken
                }
                delete newData.password
                refreshTokens.push(refreshToken);

                helper.response(response, 200, newData)
            }

        } catch (error) {
            console.log(error)
            return helper.response(response, 500, error)

        }

    },

    getToken: async function(request, response) {


        try {
            const token = request.body.token
            console.log(refreshTokens)

            if (!token) {
                return helper.response(response, 401, { message: "Unauthorization" })
            }
            if (!refreshTokens.includes(token)) {
                return helper.response(response, 403, { message: "Token Null, Please Login" })
            }
            jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, function(error, result) {

                if (error && error.name === "TokenExpiredError" || error && error.name === "JsonWebTokenError") {
                    return helper.response(response, 403, { message: error.name })
                } else {

                    const token = jwt.sign({ result }, process.env.SECRET_KEY, { expiresIn: '2d' })

                    return helper.response(response, 200, { token })



                }
            })


        } catch (error) {
            console.log(error)
            return helper.response(response, 500, error)

        }

    },
   
    deleteToken: async function(request, response) {
        try {
             refreshTokens.filter(token =>token !== request.body)
          
           response.send("logout Successfully")

        } catch (error) {
            console.log(error)
            return helper.response(response, 500, error)

        }

    }
}














