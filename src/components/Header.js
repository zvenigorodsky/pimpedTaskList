import React from 'react';
import {AppBar,
        Typography,
        IconButton,
        Grid,
    } from '@material-ui/core';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme, useThemeUpdate} from './ThemeContext'
import AddTaskForm from './AddTaskForm';

import { connect } from 'react-redux';

 
function Header (props){

    const darkTheme = useTheme();

    const useStyles = makeStyles((theme) => ({
        header: {
            background:darkTheme ? '#b53f3f':'#3f51b5',
            position:'relative',
        },
    }));

    const classes = useStyles(props)

    
    const toggleTheme = useThemeUpdate();

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
                
                <Grid item xs={1} >
                    <IconButton color='inherit' onClick={toggleShowForm}>
                        <NoteAddIcon  fontSize='large' />
                    </IconButton>
                </Grid>
                <Grid item xs={1} className={classes.toggleTheme}>
                    <IconButton color='inherit' onClick={toggleTheme}>
                        <Brightness4Icon  fontSize='large' />
                    </IconButton>
                </Grid>
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