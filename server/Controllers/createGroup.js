const utils = require("../utils/db_utils")
const dbOperations = utils.getCollectionOperations("groups")

const createGroups = async (req, res) => {
  try {
    const group = req.body
    const insertedGroup = await dbOperations.insertOne(group)
    const query = { _id: insertedGroup.insertedId }
    const updateDoc = {
      $set: {
        id: insertedGroup.insertedId,
      },
    }
    const options = {
      returnDocument: "after",
    }
    const resp = await dbOperations.updateOne(query, updateDoc, options)

    if (resp.lastErrorObject.updatedExisting !== true || resp.ok !== 1)
      throw new Error()

    res.status(201).send({ created_group: resp.value })
  } catch (err) {
    console.log(`Failed to create group because: ${JSON.stringify(err)}`)
    res.status(500).json({ msg: "Failed to create group" })
  }
}
module.exports = createGroups
