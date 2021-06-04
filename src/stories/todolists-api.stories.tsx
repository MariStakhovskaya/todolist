import React, {useEffect, useState} from 'react'
import {taskAPI, todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        todolistAPI.getTodolistsAll()
            .then((res) => {
                setState(res.data);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createNewTodolist( 'YO YO').then( (res) => {
            setState(res.data);
        } )

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)

    const deleteTodolist = () =>{
        todolistAPI.deleteTodolist(todolistId).then( (res) => {
            setState(res.data);
        })
    }
    return <div> {JSON.stringify(state)}

        <div>
            <input placeholder={'todolistId'} value={todolistId} onChange={(e) =>setTodolistId(e.currentTarget.value) } />
            <button onClick={deleteTodolist}>Delete Todolist</button>
        </div>
    </div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '5593272d-7ccf-4c4f-8fc3-01e96422c554'
        todolistAPI.updateTodolist(todolistId, 'SOME NEW TITLE')
            .then((res) => {

                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>('')

        const getTask = () => {
            taskAPI.getTasks(todolistId).then( (res) => {
                setState(res.data);
            })
        }

    return <div> {JSON.stringify(state)}
    <div>
        <input placeholder={'todolistId'} value={todolistId} onChange={(e) =>setTodolistId(e.currentTarget.value) } />
        <button onClick={getTask}>Get Task</button>
    </div>
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>('')
    const [taskId, setTaskId] = useState<any>('')

    const deleteTask = () => {
        taskAPI.deleteTask(todolistId, taskId).then( (res) => {
            setState(res.data);
        })
    }

    return <div> {JSON.stringify(state)}
    <div>
        <input placeholder={'todolistId'} value={todolistId} onChange={(e) =>setTodolistId(e.currentTarget.value) } />
        <input placeholder={'taskId'} value={taskId} onChange={(e) =>setTaskId(e.currentTarget.value) } />
        <button onClick={deleteTask}>Delete Task</button>
    </div>
    </div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)
    const [taskTitle, setTaskTitle] = useState<any>(null)

    const createTask =() =>{
        taskAPI.createTask(todolistId, taskTitle).then( (res) => {
            setState(res.data);
    })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId} onChange={(e) =>setTodolistId(e.currentTarget.value) } />
            <input placeholder={'taskTitle'} value={taskTitle} onChange={(e) =>setTaskTitle(e.currentTarget.value) } />
            <button onClick={createTask}>Create Task</button>
        </div>
    </div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)
    const [startDate, setStartDate] = useState<string | null>('')
    const [deadline, setDeadline] = useState<string | null>('')

    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')

    const updateTask =() => {
        taskAPI.updateTasks(todolistId, taskId, {
            title: title,
            description: description,
            status: status,
            priority: priority,
            startDate: '',
            deadline: ''
        }).then( (res) => {
            setState(res.data);
        })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId} onChange={(e) =>setTodolistId(e.currentTarget.value) } />
            <input placeholder={'taskId'} value={taskId} onChange={(e) =>setTaskId(e.currentTarget.value) } />
            <input placeholder={'title'} value={title} onChange={(e) =>setTitle(e.currentTarget.value) } />
            <input placeholder={'description'} value={description} onChange={(e) =>setDescription(e.currentTarget.value) } />
            <input placeholder={'status'} value={status} onChange={(e) =>setStatus(+e.currentTarget.value) } />
            <input placeholder={'priority'} value={priority} onChange={(e) =>setPriority(+e.currentTarget.value) } />
            <button onClick={updateTask}>Update Task</button>
        </div>
    </div>
}


