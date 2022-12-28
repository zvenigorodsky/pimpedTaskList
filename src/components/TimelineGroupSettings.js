import React, { useState, useCallback } from "react"
import {
  Container,
  Card,
  Grid,
  Typography,
  CardHeader,
  TextField,
  IconButton,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import HighlightOffIcon from "@material-ui/icons/HighlightOff"
import AddIcon from "@material-ui/icons/Add"
import { useDispatch } from "react-redux"
import useFetch from "../hooks/useFetch"
import Group from "./Group"
import axiosActions from "../utils/axiosRequests"

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
    padding: "10xp",
    justifyContent: "center",
  },
  margin: {
    margin: "12px",
  },
  addBtn: {
    marginTop: "12px",
    marginLeft: "-20px",
  },
  addBtnGrid: {
    paddingLeft: "0",
  },
  deleteBtn: {
    marginTop: "12px",
  },
}))
export default function TimelineGroupSettings(props) {
  const classes = useStyles(props)

  const dispatch = useDispatch()
  const toggleTimelineGroupSettings = useCallback(
    () => dispatch({ type: "TOGGLE_TIMELINE_GROUP_SETTINGS" }),
    [dispatch]
  )

  const { data: groups, isLoading, mutate } = useFetch("/groups")

  const [newGroup, setNewGroup] = useState("")
  const hideGroupSettings = () => {
    toggleTimelineGroupSettings()
  }

  const addGroup = async () => {
    try {
      await axiosActions.posetGroup(newGroup)
      mutate()
      setNewGroup("")
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className={classes.focusFormParent}>
      <Container maxWidth="xs">
        <Card className={classes.CardForm}>
          <CardHeader title={<Typography variant="h4">Groups</Typography>} />
          <Grid container spacing={3}>
            {isLoading ? (
              <Typography>Loading...</Typography>
            ) : (
              groups.map((group, index) => {
                return (
                  <Grid item xs={4} key={index}>
                    <Group group={group} />
                  </Grid>
                )
              })
            )}
            <Grid item xs={12} />
            <Grid item xs={4}>
              <TextField
                className={classes.margin}
                label="Add Group"
                value={newGroup}
                onChange={e => setNewGroup(e.target.value)}
              />
            </Grid>
            <Grid item xs={2} className={classes.addBtnGrid}>
              <IconButton className={classes.addBtn} onClick={addGroup}>
                <AddIcon />
              </IconButton>
            </Grid>
            <Grid item xs={4} />
            <Grid item xs={2}>
              <IconButton
                className={classes.deleteBtn}
                onClick={hideGroupSettings}
              >
                <HighlightOffIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </div>
  )
}
