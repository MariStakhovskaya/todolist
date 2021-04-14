import React, {ChangeEvent} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import {Delete} from "@material-ui/icons";


export type TaskPropsType = {
    taskId: string,
    title: string,
    todolistId: string
    isDone: boolean
    removeTask: (taskId: string, todolistId: string)  => void ,
    changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void,
    changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {
    console.log("Task called")

    const removeTask = () => {
        props.removeTask(props.taskId, props.todolistId)
    }
    const changeStatus = (e: ChangeEvent<HTMLInputElement>)=>{props.changeStatus(props.taskId, e.currentTarget.checked, props.todolistId)}
    const changeTaskTitle =(title:string) => {
        props.changeTaskTitle(props.taskId, title, props.todolistId)
    }

    return (
        <li key={props.taskId} className={props.isDone? "is-done" : ""}>
            <Checkbox
                onChange={changeStatus}
                color="primary"
                checked={props.isDone}/>
            <EditableSpan value={props.title} getNewTitle={changeTaskTitle}/>
            <IconButton onClick={removeTask}>
                <Delete/>
            </IconButton>
        </li>
    )
})
