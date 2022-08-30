import React,{ useState } from 'react';
import Task from './Task';
import { Typography,
        Grid,   
        Container,
        Button
    }from '@material-ui/core';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    filterBtnsGrid: {
        marginTop:'30px',
        justifyContent:'center',
    },
    tasksGrid: {
        margin: 'auto',
        marginTop: 5+ 'px',
        justifyContent:'center',
        alignItems:'center'
    },
    NoTasksText: {
        margin: 'auto',
        marginTop: '100px'
    }

})
function Tasks (props){
    
    const classes = useStyles(props);

    const [hideComplete,setHideComplete] = useState(false);

    const handleHideComplete = () =>{
        setHideComplete(true);
    }
    const showAllTasks = () => {
        setHideComplete(false);
    }
    return(
        <Container maxWidth='md'>
            <Grid
                container
                className={classes.filterBtnsGrid}>
                {props.tasks.length > 0 && 
                    <>
                        <Button variant='contained' onClick={handleHideComplete}>
                            Hide completed tasks
                        </Button>
                        <Button variant='contained' onClick={props.deleteComplete}>
                            Delete completed tasks
                        </Button>
                        <Button variant='contained' onClick={showAllTasks}>
                            Show all tasks
                        </Button>
                    </>}
            </Grid>
            <Grid 
            container 
            spacing={5} 
            className={classes.tasksGrid}>
            
                {props.tasks.length == 0 

                    ? <Typography   
                        variant='h5'
                        className={classes.NoTasksText}>
                            There are no tasks 
                    </Typography>

                    :props.tasks.map(task => {

                        if(hideComplete && task.complete) return;

                        return(
                            <Grid item xs={4} key={task.id.toString()}>
                                <Task
                                    task={task}
                                    toggleCompleteTask={props.toggleCompleteTask}
                                    deleteTask={props.deleteTask} />
                            </Grid>
                        )
                    })}
            </Grid>
            
        </ Container>
    )
    }
const mapStateToProps = (state) => {
    return{
        tasks: state.tasks
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        toggleCompleteTask: (id) => {dispatch({ type:'TOGGLE_COMPLETE_TASK', id: id})},
        deleteTask: (id) => {dispatch({ type:'DELETE_TASK', id: id})},
        deleteComplete: () => {dispatch({type:'DELETE_COMPLETE'})}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Tasks)