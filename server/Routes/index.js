const express = require('express')
const taskRoutes = require('./taskRoutes')
const groupRoutes = require('./groupRoutes')
const router = express.Router()

router.use('/tasks', taskRoutes)
router.use('/groups', groupRoutes)

module.exports = router