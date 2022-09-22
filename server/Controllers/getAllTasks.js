const utils = require('../utils/db_utils')
const dbOperations = utils.getCollectionOperations('tasks')

const getAllTasks = async (req,res) => {
    try{
        const tasks = [];
        const limit = 50;
        const resp =  await dbOperations.findAll(limit);
        await resp.sort({date: -1})
        await resp.forEach(obj => tasks.push(obj));
        res.status(200).send({msg:tasks})
    }catch(err){
        console.log(`Failed to get al tasks because: ${JSON.stringify(err)}`);
        res.status(500).send({msg:'Failed to get all tasks'})
    }
}
module.exports = getAllTasks