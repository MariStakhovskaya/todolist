import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {TaskItemType, TaskStatuses} from "../../../../api/todolist-api";
import EditableSpan from "../../../../components/EditableSpan/EditableSpan";


export type TaskPropsType = {
    task: TaskItemType,
    todolistId: string
    removeTask: (taskId: string, todolistId: string)  => void ,
    changeStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void,
    changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {
    console.log("Task called")

    const removeTask = () => {
        props.removeTask(props.task.id, props.todolistId)
    }
    const changeStatus = (e: ChangeEvent<HTMLInputElement>)=>{props.changeStatus(props.task.id,
        e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New , props.todolistId)}

    const changeTaskTitle = useCallback((title:string) => {
        props.changeTaskTitle(props.task.id, title, props.todolistId)
    },[props.task.id,props.changeTaskTitle,props.todolistId ])

    return (
        <li key={props.task.id} className={props.task.status === TaskStatuses.Completed? "is-done" : ""}>
            <Checkbox
                onChange={changeStatus}
                color="primary"
                checked={props.task.status === TaskStatuses.Completed}/>
            <EditableSpan value={props.task.title} getNewTitle={changeTaskTitle}/>
            <IconButton onClick={removeTask}>
                <Delete/>
            </IconButton>
        </li>
    )
})


export default Task
