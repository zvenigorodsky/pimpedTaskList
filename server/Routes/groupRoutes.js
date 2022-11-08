const express = require('express')
const router = express.Router()
const {schemaMiddleware} = require('../Schemas/schemaMiddleware') 
const {groupSchema, IdSchema} = require('../Schemas/Schemas')
const getAllGroups = require('../Controllers/getAllGroups')
const createGroup = require('../Controllers/createGroup')
const updateGroupContent = require('../Controllers/updateGroupContent')
const deleteGroup = require('../Controllers/deleteGroup')


router.get('/', getAllGroups);
router.post('/', schemaMiddleware(groupSchema), createGroup)
router.patch('/updateContent/:_id',schemaMiddleware(IdSchema),schemaMiddleware(groupSchema, 'body'),updateGroupContent)
router.delete('/:_id',schemaMiddleware(IdSchema),deleteGroup )

module.exports = router