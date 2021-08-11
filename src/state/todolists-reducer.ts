import {todolistAPI, TodolistType} from "../api/todolist-api";
import {v1} from "uuid";
import { Dispatch } from "redux";

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
            const newTodoListID = action.todoListID;
            const newTodoList: TodolistDomainType = {
                id: newTodoListID,
                title: action.title,
                filter: "all",
                addedDate: '',
                order: 0
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

export const AddTodoListAC = (title: string): AddTodoListActionType => {
    return {type: 'ADD-TODOLIST', title: title, todoListID: v1()}}

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