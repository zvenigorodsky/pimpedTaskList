const { ObjectId } = require('mongodb');
const utils = require('../utils/db_utils')
const dbOperations = utils.getCollectionOperations('tasks')

const deleteTask = async(req,res) => {
    try{
        const taskId = req.params._id;
        const query = { _id : ObjectId(taskId) }
        const resp = await dbOperations.deleteOne(query);
        if(resp.deletedCount === 0){
            return res.status(409).send({msg:'Theres no task with such id', error: true});
        }
        res.status(201).send({
            deletedCount:resp.deletedCount,
            idReq:taskId});
    }catch(err){
        console.log(`Failed to delete task because: ${JSON.stringify(err)}`);
        res.status(500).send({msg:'Failed to delete task'})
    }

}
module.exports = deleteTask;