const express = require('express')
const router = express.Router()
const getAllTasks = require('../Controllers/getAllTasks')
const createTask = require('../Controllers/createTask')
const deleteTask = require('../Controllers/deleteTask')

router.get('/', getAllTasks)
router.post('/',createTask)
router.delete('/',deleteTask)

module.exports = router 