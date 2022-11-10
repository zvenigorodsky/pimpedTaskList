import React from "react";
import { useState, useEffect, Fragment } from "react";
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
  MenuItem,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import axios from "axios";
import useGetTasks from "../hooks/useGetTasks";
import useGetGroups from "../hooks/useGetGroups";
import MapComponent from "./MapComponent";

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
}));

function AddTaskForm(props) {
  const { mutate } = useGetTasks();
  const { groups } = useGetGroups();
  const classes = useStyles(props);

  const [title, setTitle] = useState("");
  const [group, setGroup] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(
    new Date().toISOString().slice(0, 16)
  );
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 16));
  const [task, setTask] = useState({});
  const [poly, setPoly] = useState([]);

  useEffect(() => {
    async function postTask() {
      if (Object.keys(task).length === 0) return;
      await axios.post("/api/v1/tasks/", task);
      mutate();
      props.toggleAddTaskForm();
    }
    postTask();
  }, [task, setTask]);

  const handleTitleChange = e => {
    const value = e.target.value;
    setTitle(value);
  };
  const handleDesChange = e => {
    const value = e.target.value;
    if (value.length >= 100) return alert("Invalid title");
    setDescription(value);
  };
  const handleStartDateChange = e => {
    const value = e.target.value;
    setStartDate(value);
  };
  const handleEndDateChange = e => {
    const value = e.target.value;
    if (value < startDate) return alert("End date must be after task start");
    setEndDate(value);
  };
  const handleGroupChange = e => {
    const value = e.target.value;
    setGroup(value);
  };
  const handlePolygon = coords => {
    setPoly(() => coords);
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (endDate < startDate) return alert("End date must be after task start");
    if (group === "") return alert("Must enter group");
    if (poly.length === 0) return alert("Draw task polygon before submiting");
    setTask({
      title: title,
      description: description,
      complete: false,
      start: startDate,
      end: endDate,
      group: group,
      geometry: {
        type: "Polygon",
        polygon: poly,
      },
    });
  };

  return (
    <div className={classes.focusFormParent}>
      <Container className={classes.container} maxWidth="md">
        <Card className={classes.CardForm}>
          <form onSubmit={handleSubmit}>
            <Grid container>
              <Grid item xs={12}>
                <CardHeader
                  title={<Typography variant="h4">Add Task</Typography>}
                />
              </Grid>
              <Grid item xs={6}>
                <CardContent>
                  <TextField
                    name="title"
                    label="Task Title"
                    fullWidth
                    value={title}
                    onChange={handleTitleChange}
                  />
                </CardContent>
              </Grid>
              <Grid item xs={6}>
                <CardContent>
                  <FormControl className={classes.formControl}>
                    <InputLabel>Group</InputLabel>
                    <Select
                      native
                      defaultValue={group}
                      onChange={handleGroupChange}
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
                            );
                          return (
                            <option key={index} value={group._id}>
                              {group.content}
                            </option>
                          );
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
                    value={description}
                    onChange={handleDesChange}
                  />
                </CardContent>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Task starts at-"
                  type="datetime-local"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className={classes.dateStart}
                  value={startDate}
                  onChange={handleStartDateChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Task ends at-"
                  type="datetime-local"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={endDate}
                  onChange={handleEndDateChange}
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
  );
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    toggleAddTaskForm: () => {
      dispatch({ type: "TOGGLE_ADD_TASK_FORM" });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTaskForm);
