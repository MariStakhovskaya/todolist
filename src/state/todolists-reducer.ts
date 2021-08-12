import {todolistAPI, TodolistType} from "../api/todolist-api";
import { Dispatch } from "redux";

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    todoListID: string
}

export type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    todolist: TodolistType
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
export type SetTodoListActionType = {
    type: 'SET-TODOLISTS'
    todoLists: Array<TodolistType>
}

const initialState:Array<TodolistDomainType> = []

type ActionType = ChangeTodoListFilterActionType | ChangeTodoListTitleActionType | AddTodoListActionType | RemoveTodoListActionType | SetTodoListActionType

export type FilterValueType = "all" | "active" | "completed"
export type TodolistDomainType = TodolistType & {
    filter: FilterValueType
}


export const todoListsReducer = (state: TodolistDomainType[]=initialState, action:ActionType): TodolistDomainType[] =>{

    switch (action.type){
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.todoListID);

        case 'ADD-TODOLIST':
          //  const newTodoListID = action.todoListID;
            const newTodoList: TodolistDomainType = {...action.todolist, filter: 'all'}
            return [newTodoList,...state,];

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
        case 'SET-TODOLISTS': {
            return action.todoLists.map(tl => {
                return {
                    ...tl,
                    filter: "all"
                }
            })
        }

        default:
          return  state
    }
}


export const RemoveTodoListAC = (todoListID: string): RemoveTodoListActionType => {
 return {type: 'REMOVE-TODOLIST', todoListID: todoListID}}

export const AddTodoListAC = (todolist: TodolistType): AddTodoListActionType => {
    return {type: 'ADD-TODOLIST', todolist}}

export const ChangeTodoListTitleAC = (title: string, todoListID: string): ChangeTodoListTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITTLE', todoListID: todoListID, title: title}}

export const ChangeTodoListFilterAC = (todoListID: string, filterValue: FilterValueType): ChangeTodoListFilterActionType => {
    return {type: 'CHANGE-FILTER', todoListID: todoListID, filterValue: filterValue}}

export const SetTodoListsAC = (todoLists: Array<TodolistType>): SetTodoListActionType => {
    return {type: 'SET-TODOLISTS', todoLists: todoLists}}


export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        todolistAPI.getTodolistsAll()
            .then(res => {
                dispatch(SetTodoListsAC(res.data))
            })
    }
}

export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.deleteTodolist(todolistId)
            .then(res => {
                dispatch(RemoveTodoListAC(todolistId))
            })
    }
}

export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.createNewTodolist(title)
            .then(res => {
                dispatch(AddTodoListAC(res.data.data.item))
            })
    }
}

export const ChangeTodoListTitleTC =(title: string, todoListID: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.updateTodolist(todoListID, title)
            .then(res => {
                dispatch(ChangeTodoListTitleAC(todoListID,title))
            })
    }
}