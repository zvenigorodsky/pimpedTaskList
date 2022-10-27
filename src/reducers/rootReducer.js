const initState = {
    showAddTaskForm: false,
    showTimelineGroupSettings: false,
}

const rootReducer = (state = initState,action) => {
    if(action.type == 'TOGGLE_ADD_TASK_FORM'){
        const toggle = !state.showAddTaskForm;
        return{
            ...state,
            showAddTaskForm: toggle
        }
    }
    if(action.type == 'TOGGLE_TIMELINE_GROUP_SETTINGS'){
        const toggle = !state.showTimelineGroupSettings;
        return{
            ...state,
            showTimelineGroupSettings: toggle
        }
    }
    return state;
}


export default rootReducer;