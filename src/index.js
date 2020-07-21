const express = require('express')
const Route = express.Router()

const authRoutes = require('./routes/auth');
Route.use('/auth',authRoutes);

const jobRoutes = require('./routes/job');
Route.use('/job',jobRoutes);

module.exports = Route