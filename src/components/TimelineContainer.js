import React,{useEffect, useRef, useState} from 'react'
import useGetTasks from '../hooks/useGetTasks'
import { Timeline } from 'vis-timeline/standalone'
import { DataSet } from 'vis-data'
import axios from 'axios'

const styles = {
    position:'absolute',
    margin: '0 0 0 740px',
    top:'100px'
}
export default function TimelineComponent(){

    const {tasks, isLoading, isError, mutate} = useGetTasks('')

    const TimelineDiv = useRef()
    const timeline = useRef()

    useEffect(()=> {
        const container = TimelineDiv.current
        const items = new DataSet()
        const groups = new DataSet();
        const options = {
            width:'600px',
            selectable: true,
            editable:{
                add: false,         // add new items by double tapping
                updateTime: true,  // drag items horizontally
                updateGroup: true, // drag items from one group to another
                remove: true,       // delete an item by tapping the delete button top right
            },
            onMove: updateTimelineTask,
            onRemove: removeTimelineTask,
            background: '#f5f5f5',
              
        };
        timeline.current = new Timeline(container,items, groups, options);
    },[]);

    const removeTimelineTask = async(item,callback) => {
        try{await axios.delete(`/api/v1/tasks/${item._id}`)
        mutate()
        callback(item)
        }catch(err){
            console.log(err)
        }
    }
    const updateTimelineTask = async (item,callback) => {
        try{
            await axios.patch(`/api/v1/tasks/updateTask/${item._id}`,{
            start: item.start.toISOString().slice(0,16),
            end: item.end.toISOString().slice(0,16),
            group:JSON.stringify(item.group),
        })
        mutate()
        callback(item)
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        const groups = [
            {
            id: 1,
            content: 'hobby'
        },
        {
            id: 2,
            content: 'work'
        },
        {
            id: 3,
            content: 'chores'
        },
        {
            id: 4,
            content: 'social'
        }
    ];
        timeline.current.setData({
            groups: groups,
            items:tasks,
        })
    },[tasks])

    return(
        <>
            <div style={styles} ref={TimelineDiv}></div>
        </>
    );
}