import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValueType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton} from "@material-ui/core";
import {CheckBox, Delete} from "@material-ui/icons";


export  type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValueType
    removeTodolist: (todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    removeTask: (taskID: string,todoListID: string) => void
    changeFilter: (todoListID: string, filterValue: FilterValueType) => void
    changeStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    changeTodoListTitle: (title:string, todoListID: string) => void

}

export function Todolist(props: PropsType) {

    /*const [title, setTitle] = useState<string>("")
    const [error, setError] =useState<string|null>(null)*/

    const tasks = props.tasks.map(taskObj => {

        const removeTask = () => {
            props.removeTask(taskObj.id, props.id)
        }
        const changeStatus = (e: ChangeEvent<HTMLInputElement>)=>{props.changeStatus(taskObj.id, e.currentTarget.checked, props.id)}
        const changeTaskTitle =(title:string) => {
            props.changeTaskTitle(taskObj.id, title, props.id)
        }

        return (
            <li key={taskObj.id} className={taskObj.isDone? "is-done" : ""}>
                <Checkbox
                    onChange={changeStatus}
                   color="primary"
                    checked={taskObj.isDone}/>
                <EditableSpan value={taskObj.title} getNewTitle={changeTaskTitle}/>
                <IconButton onClick={removeTask}>
                    <Delete/>
                </IconButton>
            </li>


        )
    })


   /* const addTask = () => {
        //обрезаем пробелы с двух сторон
        const trimmedTitle = title.trim()
        if(trimmedTitle) {
            props.addTask(trimmedTitle, props.id)
        } else {
            setError("Tittle is required!")
        }
        setTitle("")
    }*/

   /* const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") addTask()
    }*/

    const onAllClickHandler = () => {
        props.changeFilter(props.id,"all")
    }
    const onActiveClickHandler = () => {
        props.changeFilter(props.id,"active")
    }
    const onCompletedClickHandler = () => {
        props.changeFilter(props.id,"completed")
    }
    const removeTodolist =()=>{props.removeTodolist(props.id)}

    const addTask = (title:string) => {
        props.addTask(title, props.id)
    }
    const changeTodoListTitle =(title: string) => {
        props.changeTodoListTitle(title, props.id)
    }

    return (
        <div>
            <h3>
            <EditableSpan value={props.title} getNewTitle={changeTodoListTitle}/>
            {/*<button onClick={removeTodolist}>x</button>*/}
            <IconButton  onClick={removeTodolist}>
                <Delete />
            </IconButton>
            </h3>
            <AddItemForm addItem = {addTask}/>
           {/* <div>
                <input
                    value={title}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                className={ error ? "error" : ""}
                />
                <button onClick={addTask}>+</button>
                {error && <div className={"error-message"}>{error}</div>}
            </div>*/}
            <ul style={ {listStyle: "none", paddingLeft: "0"}}>
                {tasks}
            </ul>
            <div>
                <ButtonGroup size="small" aria-label="small outlined button group" color="primary">
                <Button variant={props.filter === "all" ? "contained" : "outlined"} onClick={onAllClickHandler}>All</Button>
                <Button variant={props.filter === "active" ? "contained" : "outlined"} onClick={onActiveClickHandler}>Active</Button>
                <Button variant={props.filter === "completed" ? "contained" : "outlined"} onClick={onCompletedClickHandler}>Completed</Button>
                </ButtonGroup>
            </div>
        </div>

    );
}