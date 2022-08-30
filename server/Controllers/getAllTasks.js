const utils = require('../utils/db_utils')
const tasCollectionOperations = utils.getCollectionOperations('tasks')

const getAllTasks = async (req,res) => {
    const tasks = []

    const resp =  await tasCollectionOperations.findAll();
    await resp.forEach(obj => tasks.push(obj));
    res.status(200).json({msg:tasks})
}
module.exports = getAllTasks