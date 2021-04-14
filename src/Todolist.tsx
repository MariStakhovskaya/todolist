import React, {ChangeEvent, useCallback} from "react";
import {FilterValueType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";


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

export const Todolist = React.memo(function (props: PropsType) {
    console.log("Todolist called");

    let taskForTodoList = props.tasks
    if (props.filter === "active") {
        taskForTodoList = props.tasks.filter(task => !task.isDone)
    }
    if (props.filter === "completed") {
        taskForTodoList = props.tasks.filter(task => task.isDone)
    }
    const tasks = taskForTodoList.map(taskObj => {
        return <Task
            key={taskObj.id}
            taskId={taskObj.id}
            title = {taskObj.title}
            todolistId = {props.id}
            isDone = {taskObj.isDone}
            removeTask = {props.removeTask}
            changeStatus = {props.changeStatus}
            changeTaskTitle = {props.changeTaskTitle}
        />

    })

    const onAllClickHandler = () => {props.changeFilter(props.id,"all")}
    const onActiveClickHandler = () => {props.changeFilter(props.id,"active")}
    const onCompletedClickHandler = () => {props.changeFilter(props.id,"completed")}

    const removeTodolist =()=>{props.removeTodolist(props.id)}

    const addTask =useCallback( (title:string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])


    const changeTodoListTitle = useCallback((title: string) => {
        props.changeTodoListTitle(title, props.id)
    },[props.changeTodoListTitle, props.id])

    return (
        <div>
            <h3>
            <EditableSpan value={props.title} getNewTitle={changeTodoListTitle}/>
            <IconButton  onClick={removeTodolist}>
                <Delete />
            </IconButton>
            </h3>
            <AddItemForm addItem = {addTask}/>

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
})