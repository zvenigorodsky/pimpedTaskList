import React, { useEffect, useRef, useState } from "react"
import useFetch from "../hooks/useFetch"
import TimelineGroupSettings from "./TimelineGroupSettings"
import { Timeline } from "vis-timeline/standalone"
import { DataSet } from "vis-data"
import { Button, Typography } from "@material-ui/core"
import axios from "axios"
import "./TimelineStyle.css"
import { connect } from "react-redux"
import { makeStyles } from "@material-ui/core/styles"
import { useTheme } from "./ThemeContext"

function TimelineComponent(props) {
  const darkTheme = useTheme()

  const useStyles = makeStyles(theme => ({
    styles: {
      position: "absolute",
      marginLeft: "55%",
      top: "100px",
    },
    editBtn: {
      color: darkTheme ? "white" : "black",
    },
  }))

  const classes = useStyles(props)

  const { data: tasks, mutate } = useFetch("/tasks")
  const { data: groups } = useFetch("/groups")

  const TimelineDiv = useRef()
  const timeline = useRef()

  useEffect(() => {
    const container = TimelineDiv.current
    const items = new DataSet()
    const groups = new DataSet()
    const options = {
      width: "600px",
      selectable: true,
      editable: {
        add: false, // add new items by double tapping
        updateTime: true, // drag items horizontally
        updateGroup: true, // drag items from one group to another
        remove: true, // delete an item by tapping the delete button top right
      },
      onMove: updateTimelineTask,
      onRemove: removeTimelineTask,
    }
    timeline.current = new Timeline(container, items, groups, options)
  }, [])

  const removeTimelineTask = async (item, callback) => {
    try {
      await axios.delete(`/api/v1/tasks/${item._id}`)
      mutate()
      callback(item)
    } catch (err) {
      console.log(err)
    }
  }
  const updateTimelineTask = async (item, callback) => {
    try {
      await axios.patch(`/api/v1/tasks/updateTask/${item._id}`, {
        start: item.start.toISOString().slice(0, 16),
        end: item.end.toISOString().slice(0, 16),
        group: item.group,
      })
      mutate()
      callback(item)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    timeline.current.setData({
      groups: groups,
      items: tasks,
    })
  }, [tasks, groups])

  const toggleTimelineGroupSettings = () => {
    props.toggleTimelineGroupSettings()
  }
  return (
    <>
      <Button className={classes.styles} onClick={toggleTimelineGroupSettings}>
        <Typography className={classes.editBtn} variant="h6">
          Edit Groups
        </Typography>
      </Button>
      <div className={classes.styles} ref={TimelineDiv}></div>

      {props.showTimelineGroupSettings && <TimelineGroupSettings />}
    </>
  )
}
const mapStateToProps = state => {
  return {
    showTimelineGroupSettings: state.showTimelineGroupSettings,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleTimelineGroupSettings: () => {
      dispatch({ type: "TOGGLE_TIMELINE_GROUP_SETTINGS" })
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TimelineComponent)
