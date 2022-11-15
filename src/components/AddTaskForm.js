import React, { useCallback } from "react"
import { useState, useEffect, Fragment } from "react"
import { useFormik } from "formik"
import {
  Container,
  Card,
  Grid,
  Typography,
  CardHeader,
  CardContent,
  CardActions,
  TextField,
  Button,
  Select,
  InputLabel,
  FormControl,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { useDispatch } from "react-redux"
import axiosActions from "../utils/axiosRequests"
import useFetch from "../hooks/useFetch"
import MapComponent from "./MapComponent"

const actions = axiosActions()

const useStyles = makeStyles(theme => ({
  focusFormParent: {
    position: " fixed",
    top: "0",
    height: "100vh",
    width: "100vw",
    background: "rgba(128,128,128, 0.75)",
    zIndex: " 2200",
  },
  CardForm: {
    marginTop: "50px",
    width: "444px",
    justifyContent: "center",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  dateStart: {
    marginLeft: "10px",
  },
  selectGroup: {
    zIndex: "3500",
  },
  container: {
    margin: "auto",
    display: "flex",
  },
  mapCard: {
    marginTop: "50px",
    marginLeft: "10px",
    padding: "10px",
  },
  map: {
    width: "500px",
    height: "400px",
  },
}))

export default function AddTaskForm(props) {
  const { mutate } = useFetch("/tasks")
  const { data: groups } = useFetch("/groups")
  const classes = useStyles(props)

  const dispatch = useDispatch()
  const toggleAddTaskForm = useCallback(
    () => dispatch({ type: "TOGGLE_ADD_TASK_FORM" }),
    [dispatch]
  )

  const formik = useFormik({
    initialValues: {
      title: "",
      group: "",
      description: "",
      startDate: new Date().toISOString().slice(0, 16),
      endDate: new Date().toISOString().slice(0, 16),
    },
    onSubmit: values => {
      if (values.endDate < values.startDate)
        return alert("End date must be after task start")
      if (values.group === "") return alert("Must enter group")
      if (poly.length === 0) return alert("Draw task polygon before submiting")
      setTask({
        title: values.title,
        description: values.description,
        complete: false,
        start: values.startDate,
        end: values.endDate,
        group: values.group,
        geometry: {
          type: "Polygon",
          polygon: poly,
        },
      })
    },
  })

  const [task, setTask] = useState({})
  const [poly, setPoly] = useState([])

  useEffect(() => {
    async function postTask() {
      if (Object.keys(task).length === 0) return
      await actions.postTask(task)
      mutate()
      toggleAddTaskForm()
    }
    postTask()
  }, [task, setTask])

  const handlePolygon = coords => {
    setPoly(() => coords)
  }

  return (
    <div className={classes.focusFormParent}>
      <Container className={classes.container} maxWidth="md">
        <Card className={classes.CardForm}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container>
              <Grid item xs={12}>
                <CardHeader
                  title={<Typography variant="h4">Add Task</Typography>}
                />
              </Grid>
              <Grid item xs={6}>
                <CardContent>
                  <TextField
                    id="title"
                    name="title"
                    label="Task Title"
                    fullWidth
                    value={formik.values.title}
                    onChange={formik.handleChange}
                  />
                </CardContent>
              </Grid>
              <Grid item xs={6}>
                <CardContent>
                  <FormControl className={classes.formControl}>
                    <InputLabel>Group</InputLabel>
                    <Select
                      id="group"
                      native
                      defaultValue={formik.values.group}
                      onChange={formik.handleChange}
                    >
                      {groups.length === 0 ? (
                        <option value={""}></option>
                      ) : (
                        groups.map((group, index) => {
                          if (index === 0)
                            return (
                              <Fragment key={index}>
                                <option value={""}></option>
                                <option value={group._id}>
                                  {group.content}
                                </option>
                              </Fragment>
                            )
                          return (
                            <option key={index} value={group._id}>
                              {group.content}
                            </option>
                          )
                        })
                      )}
                    </Select>
                  </FormControl>
                </CardContent>
              </Grid>
              <Grid item xs={12}>
                <CardContent>
                  <TextField
                    name="description"
                    id="standard-multiline-static"
                    label="Task Description"
                    multiline
                    fullWidth
                    rows={4}
                    value={formik.values.description}
                    onChange={formik.handleChange}
                  />
                </CardContent>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="startDate"
                  label="Task starts at-"
                  type="datetime-local"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className={classes.dateStart}
                  value={formik.values.startDate}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="endDate"
                  label="Task ends at-"
                  type="datetime-local"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={formik.values.endDate}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={8} />
              <Grid item xs={4}>
                <CardActions>
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    type="submit"
                  >
                    Add
                  </Button>
                </CardActions>
              </Grid>
            </Grid>
          </form>
        </Card>
        <Card className={classes.mapCard}>
          <Typography variant="h6">Draw task polygon</Typography>
          <MapComponent polygonGeoJSON={handlePolygon} addTask={true} />
        </Card>
      </Container>
    </div>
  )
}
