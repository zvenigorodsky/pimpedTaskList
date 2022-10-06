import React from 'react';
import { Card } from '@material-ui/core';
import { CardHeader, 
        CardContent,
        CardActions,
        Typography,
        IconButton,
        Checkbox,
        TextField,
        Accordion,
        AccordionSummery,
        AccordionDetails,  
    } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ToolBar from '@material-ui/core/Toolbar';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {useTheme} from './ThemeContext';

export default function Task (props){
    const darkTheme = useTheme();

    const useStyles = makeStyles({
        card: {
            background:darkTheme ?'grey':'white',
            boxShadow:'0 0 10px 2px rgba(173,173,173,0.75)',
            borderRadius:'10px'
        },
    })
    const classes = useStyles();

    const toggleCheckbox = () =>{
        const task = props.task;
        props.toggleCompleteTask(task);
    }
    const handleStartDateChange = (e) => {
        const startDate = e.target.value;
        if(props.task.end < startDate) return alert('Start date cannot be after task end')
        props.changeStartDate(startDate, props.task._id);
    }
    const handleEndDateChange = (e) => {
        const endDate = e.target.value;
        if(endDate < props.task.start) return alert('End date cannot be before task start')
        props.changeEndDate(endDate, props.task._id)
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
            <TextField
                label="Task starts at-"
                type="datetime-local"
                InputLabelProps={{
                    shrink:true,
                }}
                value={props.task.start}
                onChange={handleStartDateChange}/>
            </CardActions>
            <CardActions>
            <TextField
                label="Task ends at-"
                type="datetime-local"
                InputLabelProps={{
                    shrink:true,
                }}
                value={props.task.end}
                onChange={handleEndDateChange}/>
            </CardActions>
            <CardActions>
                <ToolBar>
                <Checkbox 
                    color={darkTheme ?  "secondary": "primary" } 
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

