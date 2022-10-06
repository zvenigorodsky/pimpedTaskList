import React from 'react';
import { useState,useEffect } from 'react';
import {Container,
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
        FormControl
    } from '@material-ui/core'; 
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import axios from 'axios'
import useGetTasks from '../hooks/useGetTasks'

const useStyles = makeStyles((theme)=>({
    focusFormParent:{
        position:' fixed',
        top: '0',
        height: '100vh',
        width: '100vw',
        background: 'rgba(128,128,128, 0.75)',
        zIndex:' 2200',
    },
    CardForm:{
        marginTop: '50px',
        justifyContent: 'center',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    dateStart: {
        marginLeft:'10px',
    },
    selectGroup:{
        zIndex:'3500',
    }

}))

function AddTaskForm (props){ 
    const { mutate } = useGetTasks();
    
    const classes = useStyles(props);

    const [title,setTitle] = useState('');
    const [group, setGroup] = useState('');
    const [description,setDescription] = useState('');
    const [startDate, setStartDate] = useState(new Date().toISOString().slice(0,16));
    const [endDate,setEndDate] = useState(new Date().toISOString().slice(0,16));
    const [task,setTask] = useState({});

    useEffect(()=>{
        async function postTask(){
            if(Object.keys(task).length === 0) return;
            await axios.post('/api/v1/tasks/', task)
            mutate();
            props.toggleAddTaskForm();
        }
        postTask()
    },[task, setTask])
    
    const handleTitleChange = (e) => {
        const value = e.target.value;
        setTitle(value)
    }
    const handleDesChange = (e) => {
        const value = e.target.value;
        if(value.length >= 100) return alert('Invalid title')
        setDescription(value)
    }
    const handleStartDateChange = (e) => {
        const value = e.target.value;
        setStartDate(value);
    }
    const handleEndDateChange = (e) => {
        const value = e.target.value;
        if(value < startDate) return alert('End date must be after task start')
        setEndDate(value);
    }
    const handleGroupChange = (e) => {
        const value = e.target.value;
        setGroup(value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(endDate < startDate) return alert('End date must be after task start')
        if(group === '') return alert('Must enter group')
        setTask({
            title: title,
            description: description,
            complete: false,
            start: startDate,
            end: endDate,
            group: group,
        });
    }
    
    return (
        <div className={classes.focusFormParent}>
            <Container maxWidth='xs'>
                <Card className={classes.CardForm}>
                    <form onSubmit={handleSubmit}>
                        <Grid container>
                            <Grid item xs={12} >
                                <CardHeader title={
                                    <Typography variant='h4'>
                                        Add Task
                                    </Typography>
                                } />
                            </Grid>
                            <Grid item xs={6}>
                                <CardContent>
                                    <TextField
                                        name='title'
                                        label='Task Title'
                                        fullWidth
                                        value={title}
                                        onChange={handleTitleChange} />
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
                                            <option value={''}></option>
                                            <option value={1}>hobby</option>
                                            <option value={2}>work</option>
                                            <option value={3}>chores</option>
                                            <option value={4}>social</option>
                                        </Select>   
                                    </FormControl>
                                </CardContent>
                            </Grid>
                            <Grid item xs={12}>
                                <CardContent>
                                    <TextField
                                        name='description'
                                        id="standard-multiline-static"
                                        label='Task Description'
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
                                        shrink:true,
                                    }}
                                    className={classes.dateStart}
                                    value={startDate}
                                    onChange={handleStartDateChange}  />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Task ends at-"
                                    type="datetime-local"
                                    InputLabelProps={{
                                        shrink:true,
                                    }}
                                    value={endDate}
                                    onChange={handleEndDateChange}  />
                            </Grid>
                            <Grid item xs={8} />
                            <Grid item xs={4}>
                                <CardActions>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        fullWidth
                                        type='submit'>
                                        Add
                                    </Button>
                                </CardActions>
                            </Grid>
                        </Grid>
                    </form>
                </Card>
            </Container>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {};
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleAddTaskForm: () => { dispatch({ type: 'TOGGLE_ADD_TASK_FORM' }) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTaskForm)