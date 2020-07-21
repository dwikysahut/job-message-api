const Sequelize = require('sequelize');
const sequelize = require('../config/sequelizeConn')
module.exports = sequelize.define('user',{
    'id': {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    'username' : Sequelize.STRING,
    'password' : Sequelize.STRING,
    'location' : Sequelize.STRING,
    'availability' : Sequelize.STRING,
    'other_appointment' : Sequelize.STRING,
    'rating' : Sequelize.STRING,
    'createdAt': {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },    
    'updatedAt': {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
   
},
{
    freezeTableName: true,
})