import {todolistAPI, TodolistType} from "../api/todolist-api";
import { Dispatch } from "redux";



const initialState:Array<TodolistDomainType> = []

type ActionType = ReturnType<typeof ChangeTodoListFilterAC> | ReturnType<typeof ChangeTodoListTitleAC> | ReturnType<typeof AddTodoListAC> | ReturnType<typeof RemoveTodoListAC> | ReturnType<typeof SetTodoListsAC>

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


export const RemoveTodoListAC = (todoListID: string) => ({type: 'REMOVE-TODOLIST', todoListID: todoListID} as const)

export const AddTodoListAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const)

export const ChangeTodoListTitleAC = (title: string, todoListID: string) => {
    return {type: 'CHANGE-TODOLIST-TITTLE', todoListID, title} as const}

export const ChangeTodoListFilterAC = (todoListID: string, filterValue: FilterValueType) => {return {type: 'CHANGE-FILTER', todoListID, filterValue} as const}

export const SetTodoListsAC = (todoLists: Array<TodolistType>) => {
    return {type: 'SET-TODOLISTS', todoLists} as const}


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