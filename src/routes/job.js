const express = require('express');
const Route = express.Router();
const jobController = require('../controllers/job')

const { authorization } = require('../middleware/auth')
// const kue = require('kue')
// const queue = kue.createQueue()
// queue.process('job',authorization,jobController.getJobs)
  
// const { authentication } = require('../middleware/authen')
Route
    .get('/',authorization,jobController.getJobs)
    .post('/login', jobController.postJob)

    .put('/:id',authorization,jobController.putJob)
    
module.exports = Route