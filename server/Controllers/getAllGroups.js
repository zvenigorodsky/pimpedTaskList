const utils = require('../utils/db_utils')
const dbOperations = utils.getCollectionOperations('groups')

const getAllGroups = async (req,res) => {
    try{
        const groups = [];
        const limit = 50;
        const resp =  await dbOperations.findAll(limit);
        await resp.sort({id:-1})
        await resp.forEach(obj => groups.push(obj));
        res.status(200).send({msg:groups})
    }catch(err){
        console.log(`Failed to get all groups because: ${JSON.stringify(err)}`);
        res.status(500).send({msg:'Failed to get all groups'})
    }
}
module.exports = getAllGroups