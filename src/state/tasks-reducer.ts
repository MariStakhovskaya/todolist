import {TasksStateType} from '../App';
import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType} from "./todolists-reducer";


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
    isDone: boolean,
    todolistId: string
}

export type changeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    taskId: string,
    newTitle: string,
    todolistId: string
}


type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeStatusTaskActionType | changeTaskTitleActionType | AddTodoListActionType | RemoveTodoListActionType;

export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            let copyState = {...state}
            copyState[action.todolistId]= copyState[action.todolistId].filter(t => t.id !== action.taskId)

            return copyState
        case 'ADD-TASK':
            let task = {id: v1(), title: action.title, isDone: false};
            let copyState1 = {...state}
            copyState1[action.todolistId] = [task, ... copyState1[action.todolistId]]

           return copyState1

        case 'CHANGE-STATUS-TASK': {

          /*  let copyState = {...state}
            let todolistTasks = copyState[action.todolistId];
            let task = todolistTasks.find(t => t.id === action.taskId);
            if (task) {
               task.isDone = action.isDone;
            }
            return copyState*/
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => {
                    if (task.id !== action.taskId) {
                        return task
                    } else {
                        return {...task, isDone: action.isDone}
                    }
                })
            }}


        case "CHANGE-TASK-TITLE": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => {
                    if (task.id !== action.taskId) {
                        return task
                    } else {
                        return {...task, title: action.newTitle}
                    }
                })
            }}
           /*
            let copyState = {...state}
            let todolistTasks = copyState[action.todolistId];
            let task = todolistTasks.find(t => t.id === action.taskId);
            if (task) {
                task.title = action.newTitle;
            }
            return copyState
*/
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

        default:
            throw new Error("I don't understand this type")
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

export const changeTaskStatusAC = (taskId: string, isDone:boolean, todolistId: string): ChangeStatusTaskActionType => {
    return { type: 'CHANGE-STATUS-TASK',
        taskId: taskId,
        isDone: isDone,
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

