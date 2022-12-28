import React, { useState } from "react"
import { Card } from "@material-ui/core"
import { Typography, IconButton, TextField } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import HighlightOffIcon from "@material-ui/icons/HighlightOff"
import EditIcon from "@material-ui/icons/Edit"
import DoneIcon from "@material-ui/icons/Done"
import axiosActions from "../utils/axiosRequests"
import useFetch from "../hooks/useFetch"

const actions = axiosActions()

const useStyles = makeStyles({
  group: {
    margin: "5px",
  },
  groupBtn: {
    height: "5px",
    width: "5px",
    marginLeft: "5px",
  },
  content: {
    paddingLeft: "5px",
  },
})

export default function Group(props) {
  const classes = useStyles()

  const [editContent, setEditContent] = useState(false)
  const [content, setContent] = useState(props.group.content)
  const { data: groups, mutate } = useFetch("/groups")
  const { data: tasks } = useFetch("/tasks")

  const updateContent = async () => {
    try {
      const id = props.group._id
      const index = groups.findIndex(group => group._id === id)
      const optimisticData = groups.slice()
      optimisticData[index] = {
        ...optimisticData[index],
        content: content,
      }
      mutate(optimisticData, false)
      await actions.patchGroup(props.group._id, content)
      setEditContent(prev => !prev)
      mutate()
    } catch (err) {
      console.log(err)
    }
  }
  const deleteGroup = async () => {
    try {
      const id = props.group._id

      if (!tasks.every(task => task.group !== id))
        return alert("Cant delete Groups that have assigned tasks")

      const optimisticData = groups.filter(group => group._id !== id)
      mutate(optimisticData, false)
      await deleteGroup(props.group._id)
      mutate()
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <Card className={classes.group}>
      {editContent ? (
        <TextField value={content} onChange={e => setContent(e.target.value)} />
      ) : (
        <Typography className={classes.content} variant="h6">
          {props.group.content}
        </Typography>
      )}
      <IconButton className={classes.groupBtn} onClick={deleteGroup}>
        <HighlightOffIcon />
      </IconButton>
      {editContent ? (
        <IconButton className={classes.groupBtn} onClick={updateContent}>
          <DoneIcon />
        </IconButton>
      ) : (
        <IconButton
          className={classes.groupBtn}
          onClick={() => setEditContent(prev => !prev)}
        >
          <EditIcon />
        </IconButton>
      )}
    </Card>
  )
}
