import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import { v1 } from 'uuid';
import AddItemForm from "./AddItemForm";
import {AppBar, Button, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Menu, Wallpaper} from "@material-ui/icons";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
    todoListsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";


export type FilterValueType = "all" | "active" | "completed"

export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType

}

export type TasksStateType = {
    [key: string] : Array<TaskType>

}

function AppWithRedux() {
//BLL

  /*  const todoListsD1 = v1();
    const todoListsD2 = v1();


    let [todoLists, dispatchToTodoLists] = useReducer( todoListsReducer,[
        {id: todoListsD1,  title: "What to Learn", filter: "all"},
        {id: todoListsD2,  title: "What to buy", filter: "all"},
    ])
    const [tasks, dispatchToTasks] = useReducer(tasksReducer,{
        [todoListsD1]:[
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GRAPH QL", isDone: false},
        ],
        [todoListsD2]:[
            {id: v1(), title: "Beer", isDone: false},
            {id: v1(), title: "Fish", isDone: false},
            {id: v1(), title: "Chips", isDone: false},

        ]
    })*/

    const todoLists = useSelector<AppRootStateType,Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType,TasksStateType>(state => state.tasks)

    const dispatch = useDispatch()


    function changeFilter(todoListID: string, filterValue: FilterValueType) {
        dispatch(ChangeTodoListFilterAC(todoListID,filterValue))
    }

    function removeTask(taskID: string, todoListID: string) {
        dispatch(removeTaskAC(taskID,todoListID))
    }

    function addTask(title: string, todoListID: string) {
        dispatch(addTaskAC(title, todoListID ))
    }

    function changeStatus (taskID: string, isDone: boolean, todoListID: string) {
        dispatch(changeTaskStatusAC(taskID, isDone,todoListID ))
    }

    function changeTaskTitle (taskID: string, title: string, todoListID: string) {
        dispatch(changeTaskTitleAC(taskID,title,todoListID))
    }

    function removeTodolist( todoListID: string) {
        dispatch(RemoveTodoListAC(todoListID))

    }

    function addTodoList (title: string){
        dispatch(AddTodoListAC(title))
    }

    function changeTodoListTitle (todoListID: string, title:string) {
        dispatch(ChangeTodoListTitleAC(todoListID,title))
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start"  color="inherit" aria-label="menu">
                       <Menu  />
                    </IconButton>
                    <Typography variant="h6" >
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed={true}>
                <Grid container={true} style={ {padding:"15px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container={true} spacing={7}>
            {todoLists.map(tl => {
                let allTodoListTask = tasks[tl.id]
                let taskForTodoList =allTodoListTask;

                if (tl.filter === "active") {
                    taskForTodoList = allTodoListTask.filter(task => !task.isDone)
                }
                if (tl.filter === "completed") {
                    taskForTodoList = allTodoListTask.filter(task => task.isDone)
                }

                return <Grid item>
                    <Paper elevation={3} style={ {padding:"15px", borderRadius: "15px"}}>
                        <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={taskForTodoList}
                        filter={tl.filter}
                        addTask={addTask}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        changeStatus={changeStatus}
                        removeTodolist={removeTodolist}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                    </Paper>
                </Grid>

            })} </Grid>
            </Container>


        </div>
    );
}

export default AppWithRedux;
