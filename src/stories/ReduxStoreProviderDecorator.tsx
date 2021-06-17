import React from 'react'
import {Provider} from 'react-redux'
import {combineReducers, createStore} from 'redux'
import {tasksReducer} from '../state/tasks-reducer'
import {todoListsReducer} from '../state/todolists-reducer'
import {v1} from 'uuid'
import {AppRootStateType} from '../state/store'
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todoListsReducer
})

const initialGlobalState = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", order: 0 , addedDate: ''},
        {id: "todolistId2", title: "What to buy", filter: "all",order: 0 , addedDate: '' }
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed,
                description: '', priority: TaskPriorities.Low, startDate: '', deadline: '',
                todoListId:"todolistId1", order: 0, addedDate: ''},
            {id: v1(), title: "JS", status: TaskStatuses.Completed,
                description: '', priority: TaskPriorities.Low, startDate: '', deadline: '',
                todoListId:"todolistId1", order: 0, addedDate: ''}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", status: TaskStatuses.Completed,
                description: '', priority: TaskPriorities.Low, startDate: '', deadline: '',
                todoListId:"todolistId2", order: 0, addedDate: ''},
            {id: v1(), title: "React Book", status: TaskStatuses.Completed,
                description: '', priority: TaskPriorities.Low, startDate: '', deadline: '',
                todoListId:"todolistId2", order: 0, addedDate: ''}
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)
