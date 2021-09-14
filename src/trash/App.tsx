import React, {useState} from 'react';
import '../app/App.css';
import { Todolist} from "../features/TodolistsList/Todolist/Todolist";
import { v1 } from 'uuid';
import AddItemForm from "../components/AddItemForm/AddItemForm";
import {AppBar, Button, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Menu, Wallpaper} from "@material-ui/icons";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {FilterValueType, TodolistDomainType} from "../state/todolists-reducer";
import {TaskItemType, TaskPriorities, TaskStatuses} from "../api/todolist-api";




export type TasksStateType = {
    [key: string] : Array<TaskItemType>

}

function App() {
//BLL

    const todoListsD1 = v1();
    const todoListsD2 = v1();

    const [todoLists, setTodoLists] = useState<Array<TodolistDomainType>>([
        {id: todoListsD1,  title: "What to Learn", filter: "all", addedDate: '', order: 0},
        {id: todoListsD2,  title: "What to buy", filter: "all", addedDate: '', order: 0},
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListsD1]:[
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, todoListId:todoListsD1, description: '',priority:TaskPriorities.Low,
                startDate: '', deadline: '',order: 0,addedDate: '' },
            {id: v1(), title: "JS", status: TaskStatuses.Completed, todoListId:todoListsD1, description: '',priority:TaskPriorities.Low,
                startDate: '', deadline: '',order: 0,addedDate: ''},
            {id: v1(), title: "ReactJS",status: TaskStatuses.New, todoListId:todoListsD1, description: '',priority:TaskPriorities.Low,
                startDate: '', deadline: '',order: 0,addedDate: ''},
            {id: v1(), title: "Rest API", status: TaskStatuses.New, todoListId:todoListsD1, description: '',priority:TaskPriorities.Low,
                startDate: '', deadline: '',order: 0,addedDate: ''},
            {id: v1(), title: "GRAPH QL",status: TaskStatuses.New, todoListId:todoListsD1, description: '',priority:TaskPriorities.Low,
                startDate: '', deadline: '',order: 0,addedDate: ''},
        ],
        [todoListsD2]:[
            {id: v1(), title: "Beer", status: TaskStatuses.New, todoListId:todoListsD2, description: '',priority:TaskPriorities.Low,
                startDate: '', deadline: '',order: 0,addedDate: ''},
            {id: v1(), title: "Fish", status: TaskStatuses.New, todoListId:todoListsD2, description: '',priority:TaskPriorities.Low,
                startDate: '', deadline: '',order: 0,addedDate: ''},
            {id: v1(), title: "Chips",status: TaskStatuses.New, todoListId:todoListsD2, description: '',priority:TaskPriorities.Low,
                startDate: '', deadline: '',order: 0,addedDate: ''},

        ]
    })

    function changeFilter( todoListID: string, filterValue: FilterValueType) {
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
        const newTask: TaskItemType = {
            id: v1(),
            title: title,
            status: TaskStatuses.New,
            todoListId:todoListID,
            description: '',
            priority:TaskPriorities.Low,
            startDate: '',
            deadline: '',
            order: 0,
            addedDate: ''
        }
        let todoListTasks = tasks[todoListID];
        tasks[todoListID] = [newTask,...todoListTasks] // доюавляем новую таску, и содержимое старого массива
       setTasks({ ...tasks})

    }

    function changeStatus (taskID: string, status: TaskStatuses, todoListID: string) {
        let todoListTasks = tasks[todoListID];
        let task = todoListTasks.find(t => t.id === taskID)
        // есть вероятность что таску не найдем, поэтому проверяем, есть ли таска
        // псевдоложь (false) =все пустые значения (0, -0, null, undefined, "" путсая строка, NaN
        // все остальное в true
        if(task){
        task.status = status
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
        const newTodoList: TodolistDomainType = {
            id:newTodoListID,
            title: title,
            filter: "all",
            addedDate: '',
            order: 0
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
                    taskForTodoList = allTodoListTask.filter(task => task.status === TaskStatuses.New)
                }
                if (tl.filter === "completed") {
                    taskForTodoList = allTodoListTask.filter(task => task.status === TaskStatuses.Completed)
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
