const { ObjectId } = require("mongodb")
const utils = require("../utils/db_utils")
const dbOperations = utils.getCollectionOperations("groups")

const deleteGroup = async (req, res) => {
  try {
    const groupId = req.params._id
    const query = { _id: ObjectId(groupId) }
    const resp = await dbOperations.deleteOne(query)
    if (resp.deletedCount === 0) {
      return res
        .status(409)
        .send({ msg: "Theres no group with such id", error: true })
    }
    res.status(201).send({
      deletedCount: resp.deletedCount,
      idReq: groupId,
    })
  } catch (err) {
    console.log(`Failed to delete group because: ${JSON.stringify(err)}`)
    res.status(500).send({ msg: "Failed to delete group" })
  }
}
module.exports = deleteGroup
