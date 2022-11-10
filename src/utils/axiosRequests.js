import axios from "axios"

const postTask = async task => await axios.post("/api/v1/tasks/", task)

const deleteTask = async taskId => await axios.delete(`/api/v1/tasks/${taskId}`)

const toggleCompleteTask = async taskId =>
  await axios.patch(`/api/v1/tasks/toggleCompleteField/${taskId}`, {
    complete: !task.complete,
  })

const deleteCompleteTasks = async () =>
  await axios.delete("/api/v1/tasks/completedTasks")

const patchTaskDate = async (taskId, content) =>
  await axios.patch(`/api/v1/tasks/updateTask/${taskId}`, content)

const postGroup = async group =>
  await axios.post("api/v1/groups", { content: group })

const patchGroup = async (groupId, content) =>
  await axios.patch(`api/v1/groups/updateContent/${groupId}`, {
    content: content,
  })

const deleteGroup = async groupId =>
  await axios.delete(`api/v1/groups/${groupId}`)

export default {}
