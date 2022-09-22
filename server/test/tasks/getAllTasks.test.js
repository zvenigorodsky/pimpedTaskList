const chai = require('chai');
const expect = chai.expect;
const internals = require('../index.test');
const db_utils = require('../../utils/db_utils');
require('dotenv').config({ path:`.env.${process.env.NODE_ENV}`})

const dbOperations = db_utils.getCollectionOperations('tasks');

describe('Get all tasks', function () {
    describe('GET api/v1/tasks/', function () {
      it('should return all the existing tasks', async () => {

        const tasks = [];

        const getTaskWithDescription = (description) => ({
          title:"task",
          description:description,
        })
        for(let i = 0; i < 10; i++){
          tasks.push(getTaskWithDescription(i));
        }
    
      const insertedTasks = await dbOperations.insertMany(tasks)
      const foundTasks = await dbOperations.find({title:"task"})
      
      let i = 0
      foundTasks.forEach((task) => {
        task.title
        expect(task._id + '').to.equal(insertedTasks.insertedIds[i++] + '')
      })

      const result = await internals.requestor.get('/api/v1/tasks/');

      expect(result.status).to.equal(200)
      expect(await result.body.msg.length).to.equal(10);
      });
      it('should return an empty array if theres no tasks', async () => {

        const res = await internals.requestor.get('/api/v1/tasks/');

        expect(res.status).to.equal(200)
        expect(res.body.msg.length).to.equal(0)
      })
    });
  });