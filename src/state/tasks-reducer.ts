import {TasksStateType} from '../App';
import {v1} from "uuid";
import {
    AddTodoListActionType,
    RemoveTodoListActionType,
    SetTodoListActionType,
    SetTodoListsAC
} from "./todolists-reducer";
import {taskAPI, TaskItemType, TaskPriorities, TaskStatuses, todolistAPI} from "../api/todolist-api";
import {Dispatch} from "redux";


export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    taskId: string,
    todolistId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK',
    title: string,
    todolistId: string
}

export type ChangeStatusTaskActionType = {
    type: 'CHANGE-STATUS-TASK',
    taskId: string,
    status: TaskStatuses,
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
            let task = {id: v1(), title: action.title, status: TaskStatuses.Completed,description: '', priority: TaskPriorities.Low,
                startDate: '', deadline: '', todoListId: action.todolistId, order: 0, addedDate: ''};
            let copyState1 = {...state}
            copyState1[action.todolistId] = [task, ... copyState1[action.todolistId]]

           return copyState1

        case 'CHANGE-STATUS-TASK': {

            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => {
                    if (task.id !== action.taskId) {
                        return {...task}
                    } else {
                        return {...task, status: action.status}
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
                [action.todoListID]: []

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
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return { type: 'ADD-TASK',
            title: title,
            todolistId: todolistId
            }
}

export const changeTaskStatusAC = (taskId: string, status:TaskStatuses, todolistId: string): ChangeStatusTaskActionType => {
    return { type: 'CHANGE-STATUS-TASK',
        taskId: taskId,
        status: status,
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

export const removeTasksTC = ( taskID:string, todoListID: string) => {
    return (dispatch: Dispatch) => {
        taskAPI.deleteTask(todoListID, taskID)
            .then(res  => {
                dispatch(removeTaskAC(taskID,todoListID))
            })
    }
}

