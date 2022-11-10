import React,{ useState } from 'react'
import { Card } from '@material-ui/core'
import {Typography,
        IconButton,
        TextField,
    } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'

import EditIcon from '@material-ui/icons/Edit'
import DoneIcon from '@material-ui/icons/Done'
import axios from 'axios'

import useGetGroups from '../hooks/useGetGroups'
import useGetTasks from '../hooks/useGetTasks'

const useStyles = makeStyles({
    group: {
        margin:'5px',
    },
    groupBtn:{
        height:'5px',
        width:'5px',
        marginLeft:'5px'
    },
    content:{
        paddingLeft:'5px'
    }
})

export default function Group(props){
    const classes = useStyles();
    
    const [editContent,setEditContent] = useState(false)
    const [content, setContent] = useState(props.group.content)
    const {groups, mutateGroups} = useGetGroups()
    const {tasks} = useGetTasks('')

    const updateContent = async() => {
        try{
            const id = props.group._id
            const index = groups.findIndex(group => group._id === id)
            const optimisticData = groups.slice()
            optimisticData[index] = {
                ...optimisticData[index],
                content: content
            }
            mutateGroups(optimisticData, false)
            await axios.patch(`api/v1/groups/updateContent/${props.group._id}`,{content: content})
            setEditContent(prev => !prev)
            mutateGroups()
        }catch(err){
            console.log(err)
        }
    }
    const deleteGroup = async() => {
        try{
            const id = props.group._id

            if(!(tasks.every(task => task.group !== id))) return alert('Cant delete Groups that have assigned tasks');
            
            const optimisticData = groups.filter(group => group._id !== id )
            mutateGroups(optimisticData,false)
            await axios.delete(`api/v1/groups/${props.group._id}`);
            mutateGroups();
        }catch(err){
            console.log(err)
        }
    }
    return(
        <Card className={classes.group}>
            {editContent
            ? <TextField
                value={content}
                onChange={e => setContent(e.target.value)} />
            : <Typography className={classes.content} variant='h6'>{props.group.content}</Typography>
            }
            <IconButton className={classes.groupBtn} onClick={deleteGroup}>
                <HighlightOffIcon/>
            </IconButton>
            {editContent
            ? <IconButton  className={classes.groupBtn} onClick={updateContent}>
                <DoneIcon/>
            </IconButton>  
            :<IconButton  className={classes.groupBtn} onClick={() => setEditContent(prev => !prev)}>
                <EditIcon/>
            </IconButton>  
            }
        </Card>
    )
}