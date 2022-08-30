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
    } from '@material-ui/core'; 
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

const useStyles = makeStyles({
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

})

function AddTaskForm (props){

    const classes = useStyles(props);

    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [task,setTask] = useState([]);

    useEffect(()=>{
        if(task.length == 0) return;
        props.addTask(task);
        props.toggleAddTaskForm();
    },[task])
    
    const handleTitleChange = (e) => {
        const value = e.target.value;
        setTitle(value)
    }
    const handleDesChange = (e) => {
        const value = e.target.value;
        setDescription(value)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setTask({
            id:props.id,
            title: title,
            description: description,
            complete: false, 
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
                            <Grid item xs={8}>
                                <CardContent>
                                    <TextField
                                        name='title'
                                        label='Task Title'
                                        fullWidth
                                        value={title}
                                        onChange={handleTitleChange} />
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
    return {
        id: state.id
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTask: (task) => { dispatch({ type: 'ADD_TASK', task: task }) },
        toggleAddTaskForm: () => { dispatch({ type: 'TOGGLE_ADD_TASK_FORM' }) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTaskForm)