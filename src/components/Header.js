import React from 'react';
import {AppBar,
        Typography,
        IconButton,
        Grid
    } from '@material-ui/core';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import AddTaskForm from './AddTaskForm';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    header: {
        position:'relative',
    },
});
 
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
                <Grid item xs={1}>
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