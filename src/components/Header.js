import React from 'react';
import {AppBar,
        Typography,
        IconButton,
        Grid,
        InputBase
    } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import { makeStyles } from '@material-ui/core/styles';

import AddTaskForm from './AddTaskForm';

import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    header: {
        position:'relative',
    },
}));
 
function Header (props){

    const classes = useStyles(props)

    const toggleShowForm = () =>{
        props.toggleAddTaskForm();
    }
    return(
        <>
        <AppBar className={classes.header} >
            <Grid container>
                <Grid item xs={1} />
                <Grid item xs={2}>
                    <Typography 
                        variant='h3'>
                        Task List
                    </Typography>
                </Grid>
                <Grid item xs={7} />
                
                <Grid item xs={1}  className={classes.addTaskBtn}>
                    <IconButton color='inherit' onClick={toggleShowForm}>
                        <NoteAddIcon  fontSize='large' />
                    </IconButton>
                </Grid>
                <Grid item xs={1}/>
            </Grid>
        </AppBar>
        {props.showAddTaskForm 
            && <AddTaskForm />}
        </>
    )
}


const mapStateToProps = (state) => {
    return{
        showAddTaskForm: state.showAddTaskForm
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        toggleAddTaskForm: () => { dispatch({type:'TOGGLE_ADD_TASK_FORM'})}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)