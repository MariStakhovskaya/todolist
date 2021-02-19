import {FilterValueType, TasksStateType, TodolistType} from "../App";
import {v1} from "uuid";


export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    todoListID: string
}

export type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todoListID: string
}

export type ChangeTodoListTitleActionType = {
    type: 'CHANGE-TODOLIST-TITTLE'
    todoListID: string
    title: string
}

export type ChangeTodoListFilterActionType = {
    type: 'CHANGE-FILTER'
    todoListID: string
    filterValue: FilterValueType
}

const initialState:Array<TodolistType> = []

type ActionType = ChangeTodoListFilterActionType | ChangeTodoListTitleActionType | AddTodoListActionType | RemoveTodoListActionType

export const todoListsReducer = (state=initialState, action:ActionType) =>{

    switch (action.type){
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.todoListID);

        case 'ADD-TODOLIST':
            const newTodoListID = action.todoListID;
            const newTodoList: TodolistType = {
                id: newTodoListID,
                title: action.title,
                filter: "all"
            }
            return [...state, newTodoList];

        case 'CHANGE-TODOLIST-TITTLE': {
            const todoList = state.find(tl => tl.id === action.todoListID)
            if (todoList) {
                todoList.title = action.title;
            }
                return [...state]
            }

        case 'CHANGE-FILTER': {
            const todoList = state.find(tl => tl.id === action.todoListID)
            if (todoList) {
                todoList.filter = action.filterValue;
                return [...state]
            }
            return state
        }

        default:
          return  state

    }

}


export const RemoveTodoListAC = (todoListID: string): RemoveTodoListActionType => {
 return {
     type: 'REMOVE-TODOLIST',
     todoListID: todoListID
 }
}

export const AddTodoListAC = (title: string): AddTodoListActionType => {
    return {
        type: 'ADD-TODOLIST',
        title: title,
        todoListID: v1()
    }
}

export const ChangeTodoListTitleAC = (title: string, todoListID: string): ChangeTodoListTitleActionType => {
    return {
        type: 'CHANGE-TODOLIST-TITTLE',
        todoListID: todoListID,
        title: title
    }
}

export const ChangeTodoListFilterAC = (todoListID: string, filterValue: FilterValueType): ChangeTodoListFilterActionType => {
    return {
        type: 'CHANGE-FILTER',
        todoListID: todoListID,
        filterValue: filterValue
    }
}