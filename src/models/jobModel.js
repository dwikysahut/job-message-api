const Sequelize = require('sequelize');
const sequelize = require('../config/sequelizeConn')
module.exports = sequelize.define('job_message',{
    'id': {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    'user_id' : Sequelize.INTEGER,
    'name' : Sequelize.STRING,
    'location' : Sequelize.STRING,
    'availability' : Sequelize.STRING,
    'isClaimed' : Sequelize.STRING,

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