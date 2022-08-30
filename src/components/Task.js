import React from 'react';
import { Card } from '@material-ui/core';
import { CardHeader, 
        CardContent,
        CardActions,
        Typography,
        IconButton,
        Checkbox  
    } from '@material-ui/core';
import ToolBar from '@material-ui/core/Toolbar';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';


export default function Task (props){

    const toggleCheckbox = () =>{
        const taskId = props.task.id;
        props.toggleCompleteTask(taskId);
    }
    const deleteTask = () => {
        const taskId = props.task.id;
        props.deleteTask(taskId);
    }
    return(
        <Card 
        variant="elevation">
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
                <IconButton onClick={deleteTask}>
                    <HighlightOffIcon fontSize='large'/>                        
                </IconButton>
                </ToolBar>
            </CardActions>
            </Card>
    )
}

