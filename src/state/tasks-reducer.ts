import {TasksStateType} from '../App';
import {
    AddTodoListActionType,
    RemoveTodoListActionType,
    SetTodoListActionType,

} from "./todolists-reducer";
import {taskAPI, TaskItemType, TaskPriorities, TaskStatuses, updateTask} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";


export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    taskId: string,
    todolistId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK',
    task: TaskItemType
}

export type ChangeStatusTaskActionType = {
    type: 'UPDATE-TASK',
    taskId: string,
    model: UpdateDomainTaskModelType,
    todolistId: string
}

export type changeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    taskId: string,
    newTitle: string,
    todolistId: string
}

export type SetTaskActionType = {
    type: 'SET-TASK',
    tasks: Array<TaskItemType>,
    todolistId: string
}

const initialState:TasksStateType = {}

type ActionsType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeStatusTaskActionType
    | changeTaskTitleActionType
    | AddTodoListActionType
    | RemoveTodoListActionType
    | SetTodoListActionType
    | SetTaskActionType;

export const tasksReducer = (state=initialState, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            let copyState = {...state}
            copyState[action.todolistId]= copyState[action.todolistId].filter(t => t.id !== action.taskId)

            return copyState
        case 'ADD-TASK':
            let task = action.task
            let copyState1 = {...state}
            copyState1[task.todoListId] = [task, ... copyState1[task.todoListId]]

           return copyState1

        case 'UPDATE-TASK': {

            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => {
                    if (task.id !== action.taskId) {
                        return {...task}
                    } else {
                        return {...task, ...action.model}
                    }
                })
            }}


        case "CHANGE-TASK-TITLE": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => {
                    if (task.id !== action.taskId) {
                        return {...task}
                    } else {
                        return {...task, title: action.newTitle}
                    }
                })
            }}

        case "ADD-TODOLIST": {
            return {
                ...state,
                [action.todolist.id]: []

            }}
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
        case "SET-TASK": {
            let copyState = {...state}
            copyState[action.todolistId] = action.tasks

            return copyState
        }

        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return { type: 'REMOVE-TASK',
             taskId: taskId,
            todolistId: todolistId
        }
}
export const addTaskAC = (task: TaskItemType): AddTaskActionType => {
    return { type: 'ADD-TASK',
            task: task
            }
}

export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string): ChangeStatusTaskActionType => {
    return { type: 'UPDATE-TASK',
        taskId: taskId,
        model: model,
        todolistId: todolistId
    }
}


export const changeTaskTitleAC = (taskId: string, newTitle:string, todolistId: string): changeTaskTitleActionType => {
    return {
        type: 'CHANGE-TASK-TITLE',
        taskId: taskId,
        newTitle: newTitle,
        todolistId: todolistId
    }
}

export const setTaskAC = (tasks: Array<TaskItemType>, todolistId: string): SetTaskActionType => {
    return {
        type: 'SET-TASK',
        tasks: tasks,
        todolistId: todolistId
    }
}

export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        taskAPI.getTasks(todolistId)
            .then(res => {
                dispatch(setTaskAC(res.data.items,todolistId ))
            })
    }
}

export const removeTaskTC = ( taskID:string, todoListID: string) => {
    return (dispatch: Dispatch) => {
        taskAPI.deleteTask(todoListID, taskID)
            .then(res  => {
                dispatch(removeTaskAC(taskID,todoListID))
            })
    }
}

export const addTaskTC = (title: string, todoListID: string) => {
    return (dispatch: Dispatch) => {
        taskAPI.createTask(todoListID, title)
            .then(res => {
                dispatch(addTaskAC(res.data.data.item))
            })
    }
}

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: number
    startDate?: string
    deadline?: string
}

export  const changeTaskTC = (taskID: string, domainModel: UpdateDomainTaskModelType, todoListID: string) => {
    return (dispatch:Dispatch, getState: () => AppRootStateType) => {
        const state = getState();
       const task = state.tasks[todoListID].find(t => t.id ===taskID)
        if (!task) {
            throw new Error('task not found in the state')
            return
        }
        const apiModel: updateTask ={
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