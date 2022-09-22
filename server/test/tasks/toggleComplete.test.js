const chai = require('chai');
const expect = chai.expect;
const internals = require('../index.test');
const db_utils = require('../../utils/db_utils');
require('dotenv').config({ path:`.env.${process.env.NODE_ENV}`})

const dbOperations = db_utils.getCollectionOperations('tasks');

describe('Patch state of task.complete', () => {
    describe('PATCH api/v1/tasks/toggleCompleteField/:id',() => {
        it('should return matched task with modified complete key',async () => {

            const task = {
                title:"task",
                description:'asdfasdf',
                complete:false
            }
            const insertedTask = await dbOperations.insertOne(task)
            
            const idQuery = {_id:insertedTask.insertedId};
            const findTask = await dbOperations.findOne(idQuery)
            
            const taskId = findTask._id + '';
            
            expect(taskId).to.equal(insertedTask.insertedId + '')

            const path = `/api/v1/tasks/toggleCompleteField/${taskId}`
            const result = await internals.requestor.patch(path).send({
                complete: true,
            })

            expect(result.body.msg._id).to.equal(taskId);
            expect(result.body.msg.title).to.equal(task.title);
            expect(result.body.msg.complete).to.equal(true);
        });
        it('should return error_msg if _id param schema validation fails', async () => {
            const task = {
                title:"task",
                description:'asdfasdf',
                complete: false
            }
            const insertedTask = await dbOperations.insertOne(task)
            const findTask = await dbOperations.findOne({_id:insertedTask.insertedId})
            
            const taskId = findTask._id + '';
            expect(taskId).to.equal(insertedTask.insertedId + '')

            const INVALID_PATH_PARAM = `/api/v1/tasks/toggleCompleteField/NOT_OBJECT_ID`

            const patchRes = await internals.requestor.patch(INVALID_PATH_PARAM).send({
                complete: true
            })

            expect(patchRes.status).to.equal(500)

            expect(patchRes.body.error_msg).to.equal('"_id" failed custom validation because Invalid id');
        });
        it('should return error_msg if req.body.complete schema validation fails', async () => {
            const task = {
                title:"task",
                description:'asdfasdf',
                complete: false
            }
            const insertedTask = await dbOperations.insertOne(task)
            const findTask = await dbOperations.findOne({_id:insertedTask.insertedId})
            
            const taskId = findTask._id + '';
            expect(taskId).to.equal(insertedTask.insertedId + '')

            const path = `/api/v1/tasks/toggleCompleteField/${taskId}`

            const INVALID_BODY_SCHEMA = {complete: 'NOT_BOOL'}
            const patchRes = await internals.requestor.patch(path).send(INVALID_BODY_SCHEMA)

            expect(patchRes.status).to.equal(500)

            expect(patchRes.body.error_msg).to.equal("\"complete\" must be a boolean");
        });
    })
})