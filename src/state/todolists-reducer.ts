import {todolistAPI, TodolistType} from "../api/todolist-api";
import { Dispatch } from "redux";

const initialState:Array<TodolistDomainType> = []

export const todoListsReducer = (state: TodolistDomainType[]=initialState, action:ActionType): TodolistDomainType[] =>{

    switch (action.type){
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.todoListID);

        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all'},...state,];

        case 'CHANGE-TODOLIST-TITTLE':
            return state.map(tl => tl.id === action.todoListID ? {...tl, title: action.title} : tl)

        case 'CHANGE-FILTER':
            return state.map(tl => tl.id === action.todoListID ? {...tl, filter: action.filterValue} : tl)

        case 'SET-TODOLISTS':
            return action.todoLists.map(tl => ( {...tl, filter: "all"}))

        default:
          return  state
    }
}

// actions
export const RemoveTodoListAC = (todoListID: string) => ({type: 'REMOVE-TODOLIST', todoListID: todoListID} as const)
export const AddTodoListAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const)
export const ChangeTodoListTitleAC = (title: string, todoListID: string) => {return {type: 'CHANGE-TODOLIST-TITTLE', todoListID, title} as const}
export const ChangeTodoListFilterAC = (todoListID: string, filterValue: FilterValueType) => {return {type: 'CHANGE-FILTER', todoListID, filterValue} as const}
export const SetTodoListsAC = (todoLists: Array<TodolistType>) => {return {type: 'SET-TODOLISTS', todoLists} as const}

// thunks
export const fetchTodolistsTC = () =>  (dispatch: Dispatch<ActionType>) => {
        todolistAPI.getTodolistsAll()
            .then(res => {
                dispatch(SetTodoListsAC(res.data))
            })
}
export const removeTodolistTC = (todolistId: string) =>  (dispatch: Dispatch<ActionType>) => {
        todolistAPI.deleteTodolist(todolistId)
            .then(res => {
                dispatch(RemoveTodoListAC(todolistId))
            })
}
export const addTodolistTC = (title: string) =>  (dispatch: Dispatch<ActionType>) => {
        todolistAPI.createNewTodolist(title)
            .then(res => {
                dispatch(AddTodoListAC(res.data.data.item))
            })
}
export const ChangeTodoListTitleTC =(title: string, todoListID: string) => {
    return (dispatch: Dispatch<ActionType>) => {
        todolistAPI.updateTodolist(todoListID, title)
            .then(res => {
                dispatch(ChangeTodoListTitleAC(todoListID,title))
            })}
}

// types
export type AddTodoListActionType = ReturnType<typeof AddTodoListAC>
export type RemoveTodoListActionType = ReturnType<typeof RemoveTodoListAC>
export type SetTodoListActionType = ReturnType<typeof SetTodoListsAC>

type ActionType = ReturnType<typeof ChangeTodoListFilterAC> | ReturnType<typeof ChangeTodoListTitleAC> | AddTodoListActionType | RemoveTodoListActionType | SetTodoListActionType

export type FilterValueType = "all" | "active" | "completed"
export type TodolistDomainType = TodolistType & {
    filter: FilterValueType
}