import axios from 'axios'

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'e47adcfd-8887-4cee-83a9-679e6cab73f4'
    }
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
   ...settings,
})

// api
export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        const promise = instance.put<ResponseType>(`todo-lists/${todolistId}`, {title: title})
        return promise
    },
    getTodolistsAll(){
        const promise = instance.get<Array<TodolistType>>('todo-lists/')
        return promise
    },
    createNewTodolist(title: string){
        const promise = instance.post<ResponseType<{item: TodolistType}>>('todo-lists', {title: title})
        return promise
    },
    deleteTodolist(todolistId: string){
        const promise = instance.delete<ResponseType>(`todo-lists/${todolistId}`)
        return promise
    }
}

export const taskAPI = {
    getTasks(todolistId: string){
        const promise = instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
        return promise
    },
    deleteTask(todolistId: string, taskId:string){
        const promise = instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
        return promise
    },
    createTask(todolistId: string, taskTitle: string){
        const promise = instance.post<ResponseType<{item :TaskItemType}>>(`todo-lists/${todolistId}/tasks`, {title: taskTitle})
        return promise
    },
    updateTasks(todolistId: string, taskId:string, model: updateTask){
        const promise = instance.put<ResponseType<TaskItemType>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
        return promise
    }
}


// types
export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2 ,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2 ,
    Urgently = 3,
    Later = 4
}
export type TaskItemType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type updateTask = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}
type GetTasksResponse = {
    totalCount: number
    error: string | null
    items: TaskItemType[]
}