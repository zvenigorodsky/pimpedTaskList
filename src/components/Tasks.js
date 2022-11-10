import React, { useState, useEffect, Fragment } from "react"
import Task from "./Task"
import {
  Typography,
  Grid,
  Container,
  Button,
  InputBase,
} from "@material-ui/core"
import { useTheme } from "./ThemeContext"
import { makeStyles } from "@material-ui/core/styles"
import axios from "axios"
import useFetch from "../hooks/useFetch"
import SearchIcon from "@material-ui/icons/Search"

const useStyles = darkTheme =>
  makeStyles(theme => ({
    filterBtnsGrid: {
      backgroung: darkTheme ? "grey" : "#d5d5d5",
      marginTop: "15px",
      justifyContent: "center",
    },
    tasksGrid: {
      margin: "auto",
      marginTop: 5 + "px",
      justifyContent: "center",
      alignItems: "center",
    },
    NoTasksText: {
      margin: "auto",
      marginTop: "100px",
    },
    search: {
      position: "relative",
      height: "30px",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: darkTheme ? "grey" : "lightgrey",
      [theme.breakpoints.up("xs")]: {
        margin: "auto",
        width: "300px",
        marginTop: "15px",
      },
      display: "flex",
      alignItems: "center",
    },
    searchIcon: {
      padding: "1em",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
    },
    inputRoot: {
      color: "white",
    },
    inputInput: {
      padding: "5px",
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "200px",
      [theme.breakpoints.up("xs")]: {
        width: "10ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
    addTaskBtn: {
      position: "static",
    },
    dateText: {
      color: darkTheme ? "white" : "black",
    },
    container: {
      position: "absolute",
      background: darkTheme ? "#262626" : "white",
      margin: "0 0 0 0",
      padding: "0",
      top: "50px",
      width: "700px",
    },
    filterBtns: {
      background: darkTheme ? "grey" : "#d5d5d5",
    },
  }))

function Tasks(props) {
  const darkTheme = useTheme()

  const [hideComplete, setHideComplete] = useState(false)
  const [search, setSearch] = useState("")
  const { data: tasks, isError, mutate } = useFetch("/tasks" + search)

  const classes = useStyles()(darkTheme)

  if (isError) {
    console.log(isError)
  }

  const HideComplete = () => {
    setHideComplete(true)
  }
  const showAllTasks = () => {
    setHideComplete(false)
  }
  const deleteTask = id => {
    try {
      const optimisticData = tasks.filter(task => task.id !== id)
      mutate(optimisticData, false)
      axios.delete(`/api/v1/tasks/${id}`)
      mutate()
    } catch (err) {
      console.log(err)
    }
  }
  const toggleComplete = async task => {
    try {
      const id = task._id
      const taskIndex = tasks.findIndex(task => task._id === id)
      const optimisticState = tasks.slice()
      optimisticState[taskIndex] = {
        ...optimisticState[taskIndex],
        complete: !task.complete,
      }
      mutate(optimisticState, false)
      await axios.patch(`/api/v1/tasks/toggleCompleteField/${id}`, {
        complete: !task.complete,
      })
      mutate()
    } catch (err) {
      console.log(err)
    }
  }
  const deleteComplete = async () => {
    try {
      const optimisticState = tasks.filter(task => !task.complete)
      mutate(optimisticState, false)
      await axios.delete("/api/v1/tasks/completedTasks")
      mutate()
    } catch (err) {
      console.log(err)
    }
  }
  const handleSearch = e => {
    const taskTitle = e.target.value
    setSearch("/" + taskTitle)
    mutate()
  }
  const handleStartDateChange = async (newDate, id) => {
    try {
      await axios.patch(`/api/v1/tasks/updateTask/${id}`, { start: newDate })
      mutate()
    } catch (err) {
      console.log(err)
    }
  }
  const handleEndDateChange = async (newDate, id) => {
    try {
      await axios.patch(`/api/v1/tasks/updateTask/${id}`, { end: newDate })
      mutate()
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    mutate()
  }, [search, setSearch])

  return (
    <Container maxWidth="md" className={classes.container}>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
          value={search}
          onChange={handleSearch}
        />
      </div>
      <Grid container className={classes.filterBtnsGrid}>
        {tasks && tasks.length > 0 && (
          <>
            <Button
              variant="contained"
              onClick={HideComplete}
              item="true"
              xs={4}
              className={classes.filterBtns}
            >
              Hide completed tasks
            </Button>
            <Button
              variant="contained"
              onClick={deleteComplete}
              item="true"
              xs={4}
              className={classes.filterBtns}
            >
              Delete completed tasks
            </Button>
            <Button
              variant="contained"
              onClick={showAllTasks}
              item="true"
              xs={4}
              className={classes.filterBtns}
            >
              Show all tasks
            </Button>
          </>
        )}
      </Grid>
      <Grid container spacing={5} className={classes.tasksGrid}>
        {!tasks || tasks.length === 0 ? (
          <Typography variant="h5" className={classes.NoTasksText}>
            There are no tasks
          </Typography>
        ) : (
          tasks.map((task, index, arr) => {
            if (hideComplete && task.complete) return

            const prevTask = arr[index - 1]
            const dateWithoutTime = task => task.date.split("T")[0]

            if (
              prevTask == undefined ||
              dateWithoutTime(task) !== dateWithoutTime(prevTask)
            ) {
              const date = new Date(dateWithoutTime(task))
              const dateString = (date + "").slice(0, 15)
              return (
                <Fragment key={index}>
                  <Grid item xs={12} key={index}>
                    <Typography variant="h5" className={classes.dateText}>
                      {dateString}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} key={task._id}>
                    <Task
                      task={task}
                      toggleCompleteTask={toggleComplete}
                      deleteTask={deleteTask}
                      changeStartDate={handleStartDateChange}
                      changeEndDate={handleEndDateChange}
                    />
                  </Grid>
                </Fragment>
              )
            }

            return (
              <Grid item xs={4} key={task._id}>
                <Task
                  task={task}
                  toggleCompleteTask={toggleComplete}
                  deleteTask={deleteTask}
                  changeStartDate={handleStartDateChange}
                  changeEndDate={handleEndDateChange}
                />
              </Grid>
            )
          })
        )}
      </Grid>
    </Container>
  )
}

export default Tasks
