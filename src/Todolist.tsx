import React, {useCallback, useEffect} from "react";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, ButtonGroup, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";
import {TaskItemType, TaskStatuses} from "./api/todolist-api";
import {fetchTodolistsTC, FilterValueType} from "./state/todolists-reducer";
import {useDispatch} from "react-redux";
import {fetchTasksTC, setTaskAC} from "./state/tasks-reducer";


type PropsType = {
    id: string
    title: string
    tasks: Array<TaskItemType>
    filter: FilterValueType
    removeTodolist: (todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    removeTask: (taskID: string,todoListID: string) => void
    changeFilter: (todoListID: string, filterValue: FilterValueType) => void
    changeStatus: (taskID: string, status: TaskStatuses, todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    changeTodoListTitle: (title:string, todoListID: string) => void

}

export const Todolist = React.memo(function (props: PropsType) {
    console.log("Todolist called");

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTasksTC(props.id))
    }, [])

    let taskForTodoList = props.tasks
    if (props.filter === "active") {
        taskForTodoList = props.tasks.filter(task => task.status === TaskStatuses.New)
    }
    if (props.filter === "completed") {
        taskForTodoList = props.tasks.filter(task => task.status === TaskStatuses.Completed)
    }
    const tasks = taskForTodoList.map(taskObj => {
        return <Task
            key={taskObj.id}
            task={taskObj}
            todolistId = {props.id}
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