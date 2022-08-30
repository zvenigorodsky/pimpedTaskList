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
    if(action.type == 'ADD_TASK'){
        const idCount = state.id + 1;
        return{
            ...state,
            tasks: [...state.tasks,action.task],
            id: idCount,
        }
    }   
    if(action.type == 'TOGGLE_COMPLETE_TASK'){
        const taskId = action.id;
        const tasksCopy = state.tasks.map(task => {
                if(task.id == taskId){
                    task.complete = !task.complete;
                }
                return task;
            });
        return{
            ...state,
            tasks: tasksCopy
        }
    }
    if(action.type == 'DELETE_TASK'){
        const taskId = action.id;
        const tasksCopy = state.tasks.filter(task => task.id !== taskId);
        return{
            ...state,
            tasks: tasksCopy
        }
    }
    if(action.type == 'DELETE_COMPLETE'){
        const tasksCopy = state.tasks.filter(task => task.complete !== true);
        return{
            ...state,
            tasks: tasksCopy
        }
    }
    return state;
}


export default rootReducer;