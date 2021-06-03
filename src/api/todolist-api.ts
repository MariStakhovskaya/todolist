import axios from 'axios'

const settings = {
    withCredentials: true,
    headers: {
        // Не забываем заменить API-KEY на собственный
        'API-KEY': 'e47adcfd-8887-4cee-83a9-679e6cab73f4'
    }
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
   ...settings,
})

type TodolistType= {
    id: string
    addedDate: string
    order: number
    title: string
}

type CreateTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    data: {
        item: TodolistType
    }
}

type UpdateTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    data: {}
}

type DeleteTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    data: {}
}



export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        const promise = instance.put<UpdateTodolistResponseType>(`todo-lists/${todolistId}`, {title: title})
        return promise
    },

    getTodolistsAll(){
        const promise = instance.get<Array<TodolistType>>('todo-lists/')
        return promise
    },

    createNewTodolist(title: string){
        const promise = instance.post<CreateTodolistResponseType>('todo-lists', {title: title})
        return promise
    },

    deleteTodolist(todolistId: string){
        const promise = instance.delete<DeleteTodolistResponseType>(`todo-lists/${todolistId}`)
        return promise
    }


}

