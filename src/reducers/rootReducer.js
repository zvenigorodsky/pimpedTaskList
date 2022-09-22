const initState = {
    id: 0,
    tasks: [],
    showAddTaskForm: false,
}

const rootReducer = (state = initState,action) => {
    if(action.type == 'TOGGLE_ADD_TASK_FORM'){
        const toggle = !state.showAddTaskForm;
        return{
            ...state,
            showAddTaskForm: toggle
        }
    }
    return state;
}


export default rootReducer;