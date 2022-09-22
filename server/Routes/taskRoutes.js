const express = require('express')
const router = express.Router()
const getAllTasks = require('../Controllers/getAllTasks')
const createTask = require('../Controllers/createTask')
const deleteTask = require('../Controllers/deleteTask')
const toggleComplete = require('../Controllers/toggleComplete')
const deleteCompletedTasks = require('../Controllers/deleteCompletedTasks')
const getSearchedTasks = require('../Controllers/getSearchedTasks')
const {schemaMiddleware} = require('../Schemas/schemaMiddleware') 
const {taskSchema, IdSchema, toggleCompleteSchema,taskTitleSchema} = require('../Schemas/Schemas')

router.get('/',  getAllTasks)
router.get('/:title',schemaMiddleware(taskTitleSchema,'params'), getSearchedTasks)
router.post('/', schemaMiddleware(taskSchema, 'body'), createTask)
router.delete('/completedTasks', deleteCompletedTasks )
router.delete('/:_id', schemaMiddleware(IdSchema, 'params'), deleteTask)
router.patch('/toggleCompleteField/:_id',schemaMiddleware(IdSchema, 'params'),schemaMiddleware(toggleCompleteSchema, 'body'),toggleComplete)


module.exports = router 