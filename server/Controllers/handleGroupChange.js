const utils = require("../utils/db_utils")
const dbOperations = utils.getCollectionOperations("tasks")
const { ObjectId } = require("mongodb")

const handleGroupChange = async (req, res) => {
  try {
    const group = req.body
    const query = { _id: ObjectId(req.params._id) }
    const updateDoc = {
      $set: group,
    }
    const options = {
      returnDocument: "after",
    }
    const resp = await dbOperations.updateOne(query, updateDoc, options)

    if (resp.lastErrorObject.updatedExisting !== true || resp.ok !== 1)
      throw new Error()

    res.status(200).send({ msg: resp.value })
  } catch (err) {
    console.log(`Failed to updated task because: ${JSON.stringify(err)}`)
    res.status(400).send({ msg: "Failed to update task" })
  }
}

module.exports = handleGroupChange
