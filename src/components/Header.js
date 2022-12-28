import React, { useCallback } from "react"
import { AppBar, Typography, IconButton, Grid } from "@material-ui/core"
import NoteAddIcon from "@material-ui/icons/NoteAdd"
import Brightness4Icon from "@material-ui/icons/Brightness4"
import { makeStyles } from "@material-ui/core/styles"
import { useTheme, useThemeUpdate } from "./ThemeContext"
import AddTaskForm from "./AddTaskForm"
import { useDispatch, useSelector } from "react-redux"

const useStyles = darkTheme =>
  makeStyles(theme => ({
    header: {
      background: darkTheme ? "#b53f3f" : "#3f51b5",
      position: "relative",
    },
  }))

export default function Header(props) {
  const darkTheme = useTheme()

  const classes = useStyles(darkTheme)(props)

  const toggleTheme = useThemeUpdate()

  const showAddTaskForm = useSelector(state => state.showAddTaskForm)

  const dispatch = useDispatch()

  const toggleAddTaskForm = useCallback(
    () => dispatch({ type: "TOGGLE_ADD_TASK_FORM" }),
    [dispatch]
  )

  return (
    <>
      <AppBar className={classes.header}>
        <Grid container>
          <Grid item xs={1} />
          <Grid item xs={2}>
            <Typography variant="h3">Task List</Typography>
          </Grid>
          <Grid item xs={7} />

          <Grid item xs={1}>
            <IconButton color="inherit" onClick={toggleAddTaskForm}>
              <NoteAddIcon fontSize="large" />
            </IconButton>
          </Grid>
          <Grid item xs={1} className={classes.toggleTheme}>
            <IconButton color="inherit" onClick={toggleTheme}>
              <Brightness4Icon fontSize="large" />
            </IconButton>
          </Grid>
        </Grid>
      </AppBar>
      {showAddTaskForm && <AddTaskForm />}
    </>
  )
}
