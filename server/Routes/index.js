const express = require('express')
const taskRoutes = require('./taskRoutes')
const router = express.Router()

router.use('/tasks', taskRoutes)

module.exports = router