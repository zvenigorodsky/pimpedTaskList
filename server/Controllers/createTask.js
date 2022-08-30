const utils = require('../utils/db_utils')
const tasksCollectionOperations = utils.getCollectionOperations('tasks')

const createTask = async(req,res) => {
    const task = {test:'check'};
    const resp = await tasksCollectionOperations.insertOne(task);
    res.status(201).json({msg:resp});

}
module.exports = createTask;