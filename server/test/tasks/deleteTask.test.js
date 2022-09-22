const {ObjectId} = require('mongodb');
const chai = require('chai');
const expect = chai.expect;
const internals = require('../index.test');
const db_utils = require('../../utils/db_utils');
require('dotenv').config({ path:`.env.${process.env.NODE_ENV}`})

const dbOperations = db_utils.getCollectionOperations('tasks');

describe('Delete a single task', function(){
    
    describe('DELETE api/v1/tasks/', function(){
        it('should delete specified task', async () => {
    
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

            const result = await internals.requestor.delete(`/api/v1/tasks/${taskId}`)

            expect(result.status).to.equal(201)
            
            const confirmDeletedTask = await dbOperations.findOne(idQuery) 
            expect(confirmDeletedTask).to.equal(null)

            expect(result.body.deletedCount).to.equal(1)
            expect(result.body.idReq).to.equal((insertedTask.insertedId + ''))
        } );
        it('should return error_msg if schema validation fails', async () => {
            const task = {
                title:"task",
                description:'asdfasdf',
            }
            const insertedTask = await dbOperations.insertOne(task)
            const findTask = await dbOperations.findOne({_id:insertedTask.insertedId})
            
            const taskId = findTask._id + '';
            expect(taskId).to.equal(insertedTask.insertedId + '')

            const INVALID_TASK = {_id:'wrong schema format'}
            const deleteRes = await internals.requestor.delete(`/api/v1/tasks/${INVALID_TASK}`)

            expect(deleteRes.status).to.equal(500)

            expect(deleteRes.body.error_msg).to.equal('"_id" failed custom validation because Invalid id');
        });
        it('should return error if task does not exist', async () => {

            const NON_EXISTENT_TASK = ObjectId(0)

            const checkInvalidTaskId = await dbOperations.findOne({_id: NON_EXISTENT_TASK});

            expect(checkInvalidTaskId).to.equal(null);


            const result = await internals.requestor.delete(`/api/v1/tasks/${NON_EXISTENT_TASK}`)

            expect(result.status).to.equal(409)
            expect(result.body.error).to.equal(true);
        });
    })
})
