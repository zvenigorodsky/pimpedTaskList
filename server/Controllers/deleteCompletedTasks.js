const utils = require('../utils/db_utils')
const dbOperations = utils.getCollectionOperations('tasks')

const deleteCompletedTasks = async (req,res) => {
    try{
        const query = {complete : true};
        const resp = await dbOperations.deleteMany(query);
        res.status(200).send({msg:`${resp.deletedCount} tasks were deleted`});
    }catch(err){
        console.log(`Failed to delete all complete tasks because: ${JSON.stringify(err)}`);
        res.stauts(409).send({msg:'Failed to delete all complete tasks'});
    }
}

module.exports = deleteCompletedTasks