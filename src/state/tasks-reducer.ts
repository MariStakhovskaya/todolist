import {TasksStateType} from '../trash/App';
import {AddTodoListActionType, RemoveTodoListActionType, SetTodoListActionType} from "./todolists-reducer";
import {taskAPI, TaskItemType, TaskStatuses, updateTask} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}

        case 'ADD-TASK':
            return {...state,[action.task.todoListId]: [action.task, ...state[action.task.todoListId]] }

        case 'UPDATE-TASK': {
            return {...state,
                [action.todolistId]: state[action.todolistId].map(task =>task.id === action.taskId ? {...task, ...action.model} : task)}
        }

        case "ADD-TODOLIST":
            return {...state, [action.todolist.id]: []}

        case "REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.todoListID]
            return copyState
        }

        case "SET-TODOLISTS": {
            let copyState = {...state}
            action.todoLists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case "SET-TASK":
            return {...state, [action.todolistId]: action.tasks }

        default:
            return state
    }
}
// actions
export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: 'REMOVE-TASK', taskId, todolistId} as const
}
export const addTaskAC = (task: TaskItemType) => {
    return {type: 'ADD-TASK', task} as const
}
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) => {
    return {
        type: 'UPDATE-TASK',
        taskId, model, todolistId
    } as const
}
export const setTaskAC = (tasks: Array<TaskItemType>, todolistId: string) => {
    return {type: 'SET-TASK', tasks, todolistId} as const
}

// thunks
export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        taskAPI.getTasks(todolistId)
            .then(res => {
                dispatch(setTaskAC(res.data.items, todolistId))
            })
    }
}
export const removeTaskTC = (taskID: string, todoListID: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        taskAPI.deleteTask(todoListID, taskID)
            .then(res => {
                dispatch(removeTaskAC(taskID, todoListID))
            })
    }
}
export const addTaskTC = (title: string, todoListID: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        taskAPI.createTask(todoListID, title)
            .then(res => {
                dispatch(addTaskAC(res.data.data.item))
            })
    }
}
export const changeTaskTC = (taskID: string, domainModel: UpdateDomainTaskModelType, todoListID: string) => {
    return (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {
        const state = getState();
        const task = state.tasks[todoListID].find(t => t.id === taskID)
        if (!task) {
            throw new Error('task not found in the state')
            return
        }
        const apiModel: updateTask = {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...domainModel
        }
        taskAPI.updateTasks(todoListID, taskID, apiModel)
            .then(res => {
                dispatch(updateTaskAC(taskID, domainModel, todoListID))
            })
    }
}

// types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: number
    startDate?: string
    deadline?: string
}

type ActionsType = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodoListActionType
    | RemoveTodoListActionType
    | SetTodoListActionType
    | ReturnType<typeof setTaskAC>;

