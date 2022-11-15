const utils = require("../utils/db_utils")
const dbOperations = utils.getCollectionOperations("tasks")

const getSearchedTasks = async (req, res) => {
  try {
    const tasks = []
    const title = req.params.title

    const DESC_SORT = -1
    const pipeline = [
      { $match: { title: { $regex: title } } },
      { $sort: { date: DESC_SORT } },
    ]
    const resp = await dbOperations.aggregate(pipeline)
    await resp.forEach(task => tasks.push(task))
    res.status(200).send({ msg: tasks })
  } catch (err) {
    console.log(`Failed to get tasks because: ${JSON.stringify(err)}`)
    res.status(500).json({ msg: "Failed to get Searched Tasks" })
  }
}
module.exports = getSearchedTasks
