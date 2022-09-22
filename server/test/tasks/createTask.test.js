const chai = require('chai');
const { ObjectId } = require('mongodb');
const expect = chai.expect;
const internals = require('../index.test');
const utils = require('../../utils/db_utils');
require('dotenv').config({ path:`.env.${process.env.NODE_ENV}`})

const dbOperations = utils.getCollectionOperations('tasks');

describe('Create a Single task', () => {
    describe('POST api/v1/tasks/', () => {
        it('should return content of inserted task', async ()=>{
            const task = {
                title:"task",
                description:'asdfasdf',
                complete:true
            }
            
            const postResult = await internals.requestor.post('/api/v1/tasks/').send(task);
            
            expect(postResult.status).to.equal(201)


            const query = {_id: await ObjectId(postResult.body.created_task._id)};
            const foundTask = await dbOperations.findOne(query);

            expect(foundTask._id.toString()).to.equal(postResult.body.created_task._id)
            expect(foundTask.title).to.equal(task.title)
            expect(foundTask.description).to.equal(task.description)
            expect(foundTask.complete).to.equal(task.complete)
            
            // V1. initialization of data -> hard coded
            // V2. unit testing
            // V3. checking results
        });

        // const roee = {
        //     name: 'roee',
        //     adress: {
        //         town: 'telmond',
        //         number: 1
        //     }
        // }
        // //shadow clone
        // const roeeCopy = {...roee}
        // roeeCopy.name = 'a'
        // roeeCopy.address.town = '123'

        // //deep clone
        // const roeeCopy2 = {...roee, address: {...roee.address}}
        // roeeCopy2.address.town = '123'

        it('should return error_msg if schema validation fails', async () => {
            const task ={
                title:'',
                description:'afsdfa'
            }

            const result = await internals.requestor.post('/api/v1/tasks/').send(task);

            const error_msg = JSON.parse(result.text).error_msg;
            
            expect(result.status).to.equal(500)
            expect(error_msg).to.equal('"title" is not allowed to be empty')
        });
    })
})