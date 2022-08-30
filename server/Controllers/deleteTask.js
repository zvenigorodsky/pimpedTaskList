const utils = require('../utils/db_utils')
const tasksCollectionOperations = utils.getCollectionOperations('tasks')

const deleteTask = async(req,res) => {
    const query = {test: 'check'};
    const resp = await tasksCollectionOperations.deleteOne(query);
    res.status(201).json({msg:resp});

}
module.exports = deleteTask;