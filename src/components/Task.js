import React from 'react';
import { Card } from '@material-ui/core';
import { CardHeader, 
        CardContent,
        CardActions,
        Typography,
        IconButton,
        Checkbox  
    } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ToolBar from '@material-ui/core/Toolbar';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import axios from 'axios'

const useStyles = makeStyles({
    card: {
        boxShadow:'0 0 10px 2px rgba(173,173,173,0.75)',
        borderRadius:'10px'
    },
})
export default function Task (props){
    const classes = useStyles();

    const toggleCheckbox =async () =>{
        const task = props.task;
        const complete = props.task.complete;
        props.toggleCompleteTask(task, complete);
    }
    return(
        <Card 
        variant="elevation"
        className={classes.card}>
            <CardHeader 
            title={
                <ToolBar>
                    <Typography variant='h5'>
                        {props.task.title}
                    </Typography>    
                    
                </ToolBar>
            }/>
            <CardContent>
                    <Typography>
                    {props.task.description}
                </Typography>
            </CardContent>
            <CardActions>
                <ToolBar>
                <Checkbox 
                    color="primary" 
                    checked={props.task.complete}
                    onChange={toggleCheckbox} />
                <Typography>
                    complete
                </Typography>
                <IconButton onClick={() => props.deleteTask(props.task._id)}>
                    <HighlightOffIcon fontSize='large'/>                        
                </IconButton>
                </ToolBar>
            </CardActions>
            </Card>
    )
}

