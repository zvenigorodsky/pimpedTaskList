
const utils = require('../utils/db_utils')
const dbOperations = utils.getCollectionOperations('tasks')

const createTask = async(req,res) => {
    try{
        const task = req.body;
        task.date = new Date().toISOString();
        const insertedTask = await dbOperations.insertOne(task);
        const resp = await dbOperations.findOne({_id:insertedTask.insertedId},{projection: { _id: 1, title: 1, description: 1,date:1 }})
        
        res.status(201).send({created_task: resp});
        
    }catch(err){
        console.log(`Failed to create task because: ${JSON.stringify(err)}`);
        res.status(500).json({msg:'Failed to create task'})
    }

}
module.exports = createTask;