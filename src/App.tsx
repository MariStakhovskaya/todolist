import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import { v1 } from 'uuid';
import AddItemForm from "./AddItemForm";
import {AppBar, Button, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Menu, Wallpaper} from "@material-ui/icons";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";


export type FilterValueType = "all" | "active" | "completed"

export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType

}

export type TasksStateType = {
    [key: string] : Array<TaskType>

}

function App() {
//BLL

    const todoListsD1 = v1();
    const todoListsD2 = v1();

    const [todoLists, setTodoLists] = useState<Array<TodolistType>>([
        {id: todoListsD1,  title: "What to Learn", filter: "all"},
        {id: todoListsD2,  title: "What to buy", filter: "all"},
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
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
    })

    function changeFilter(filterValue: FilterValueType, todoListID: string) {
        const todoList =todoLists.find(tl => tl.id === todoListID)
        if(todoList){
            todoList.filter = filterValue;
            setTodoLists([...todoLists])
        }
    }

    function removeTask(taskID: string, todoListID: string) {
       let todoListTasks = tasks[todoListID]; //в todoListTasks будет лежать массив тасок
       tasks[todoListID] = todoListTasks.filter(t =>t.id !== taskID);
       setTasks({...tasks})
    }

    function addTask(title: string, todoListID: string) {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        let todoListTasks = tasks[todoListID];
        tasks[todoListID] = [newTask,...todoListTasks] // доюавляем новую таску, и содержимое старого массива
       setTasks({ ...tasks})

    }

    function changeStatus (taskID: string, isDone: boolean, todoListID: string) {
        let todoListTasks = tasks[todoListID];
        let task = todoListTasks.find(t => t.id === taskID)
        // есть вероятность что таску не найдем, поэтому проверяем, есть ли таска
        // псевдоложь (false) =все пустые значения (0, -0, null, undefined, "" путсая строка, NaN
        // все остальное в true
        if(task){
        task.isDone = isDone
            setTasks({...tasks})
        }
    }

    function changeTaskTitle (taskID: string, title: string, todoListID: string) {
        let todoListTasks = tasks[todoListID];
        let task = todoListTasks.find(t => t.id === taskID)
        // есть вероятность что таску не найдем, поэтому проверяем, есть ли таска
        // псевдоложь (false) =все пустые значения (0, -0, null, undefined, "" путсая строка, NaN
        // все остальное в true
        if(task){
        task.title = title
            setTasks({...tasks})
        }
    }
    function removeTodolist( todoListID: string) {
       setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
        setTasks({... tasks})
    }

    function addTodoList (title: string){
        const newTodoListID = v1();
        const newTodoList: TodolistType = {
            id:newTodoListID,
            title: title,
            filter: "all"
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({
            ...tasks,
            [newTodoListID]:[]
        })
    }

    function changeTodoListTitle (title:string, todoListID: string) {
    const todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList){
            todoList.title = title
            setTodoLists([...todoLists])
        }
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

export default App;
