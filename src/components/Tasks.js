import React,{ useState, useEffect, Fragment } from 'react';
import Task from './Task';
import { Typography,
        Grid,   
        Container,
        Button,
        InputBase
    }from '@material-ui/core';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import useGetTasks from '../hooks/useGetTasks';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme)=>({
    filterBtnsGrid: {
        marginTop:'15px',
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
    },
    search: {
        position: 'relative',
        height:"30px",
        borderRadius: theme.shape.borderRadius,
        backgroundColor:"lightgrey",
        '&:hover': {
            backgroundColor:"lightgrey",
        },
        [theme.breakpoints.up('xs')]: {
            margin: 'auto',
            width: '300px',
            marginTop:"15px",
        },
        display:"flex",
        alignItems: 'center',
      },
    searchIcon: {
        padding: '1em',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        
    },
    inputRoot: {
        color: 'white',
    },
    inputInput: {
    padding: '5px',
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '200px',
    [theme.breakpoints.up('xs')]: {
        width: '10ch',
        '&:focus': {
            width: '20ch',
        },
    },
    },    
    addTaskBtn: {
        position:'static'
    },

}))
function Tasks (props){
    const classes = useStyles(props);

    const [hideComplete,setHideComplete] = useState(false);
    const [search, setSearch] = useState('');
    const { tasks, isLoading, isError, mutate} = useGetTasks(search);

    if(isError){
        console.log(isError)
    }

    const HideComplete = () =>{
        setHideComplete(true);
    }
    const showAllTasks = () => {
        setHideComplete(false);
    }
    const deleteTask = (id) => {
        try{
            axios.delete(`/api/v1/tasks/${id}`);
            mutate()
        }catch(err){
            console.log(err);
        }
    }
    const toggleComplete = async(task, complete) => {
        try{
            await axios.patch(`/api/v1/tasks/toggleCompleteField/${task._id}`,{complete:!complete});
            mutate();
        }catch(err){
            console.log(err);
        }
    }
    const deleteComplete = async() => {
        try{
            await axios.delete('/api/v1/tasks/completedTasks');
            mutate()
        }catch(err){
            console.log(err)
        }
    }
    const handleSearch = (e) => {
        const taskTitle = e.target.value;
        setSearch(taskTitle);
        mutate();
    }
    return(
        <Container maxWidth='md'>
            <div className={classes.search} >
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                placeholder="Search…"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                value={search}
                onChange={handleSearch}
                />
            </div>
            <Grid
                container
                className={classes.filterBtnsGrid}>
                {((tasks != undefined)&& (tasks.length > 0)) && 
                    <>
                        <Button 
                            variant='contained' 
                            onClick={HideComplete} 
                            item='true'
                            xs={4} >
                            Hide completed tasks
                        </Button>
                        <Button 
                            variant='contained' 
                            onClick={deleteComplete} 
                            item='true'
                            xs={4}>
                            Delete completed tasks
                        </Button>
                        <Button 
                            variant='contained' 
                            onClick={showAllTasks} 
                            item='true'
                            xs={4}>
                            Show all tasks
                        </Button>
                        
                    </>}
            </Grid>
            <Grid 
            container 
            spacing={5} 
            className={classes.tasksGrid}>
            
                {isLoading || (tasks.length === 0)

                    ? <Typography   
                        variant='h5'
                        className={classes.NoTasksText}>
                            There are no tasks 
                    </Typography>

                    :tasks.map((task,index,arr)=> {

                        if(hideComplete && task.complete) return;
                         
                        if(arr[index-1] == undefined ||
                            (task.date.split('T')[0] !== arr[index-1].date.split('T')[0])){

                                const date = new Date(task.date.split('T')[0]);
                                return(
                                <Fragment key={index}>
                                    <Grid item xs={12} key={index}>
                                        <Typography variant='h5'>
                                            {(date + '').slice(0,15)}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4} key={task._id}>
                                    <Task 
                                        task={task}
                                        toggleCompleteTask={toggleComplete}
                                        deleteTask={deleteTask} />
                                    </Grid>
                                </Fragment>
                                )
                        }
                             
                        return(
                            <Grid item xs={4} key={task._id}>
                                <Task 
                                    task={task}
                                    toggleCompleteTask={toggleComplete}
                                    deleteTask={deleteTask} />
                            </Grid>
                        )
                    })
                }
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
        toggleCompleteTask:(_id) => {
            dispatch({ type:'TOGGLE_COMPLETE_TASK', _id: _id})
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Tasks)