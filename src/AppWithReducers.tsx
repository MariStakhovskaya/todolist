import React, {useReducer} from 'react';
import './App.css';
import { Todolist} from "./Todolist";
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
    ChangeTodoListTitleAC, FilterValueType,
    RemoveTodoListAC,
    todoListsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {TaskItemType, TaskPriorities, TaskStatuses} from "./api/todolist-api";


export type TasksStateType = {
    [key: string] : Array<TaskItemType>

}

function AppWithReducers() {
//BLL

    const todoListsD1 = v1();
    const todoListsD2 = v1();


    let [todoLists, dispatchToTodoLists] = useReducer( todoListsReducer,[
        {id: todoListsD1,  title: "What to Learn", filter: "all", order: 0 , addedDate: ''},
        {id: todoListsD2,  title: "What to buy", filter: "all", order: 0 , addedDate: ''},
    ])
    const [tasks, dispatchToTasks] = useReducer(tasksReducer,{
        [todoListsD1]:[
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed,
                description: '', priority: TaskPriorities.Low, startDate: '', deadline: '',
                todoListId:todoListsD1, order: 0, addedDate: ''},
            {id: v1(), title: "JS", status: TaskStatuses.Completed,
                description: '', priority: TaskPriorities.Low, startDate: '', deadline: '',
                todoListId:todoListsD1, order: 0, addedDate: ''},
            {id: v1(), title: "ReactJS", status: TaskStatuses.New,
                description: '', priority: TaskPriorities.Low, startDate: '', deadline: '',
                todoListId:todoListsD1, order: 0, addedDate: ''},
            {id: v1(), title: "Rest API", status: TaskStatuses.New,
                description: '', priority: TaskPriorities.Low, startDate: '', deadline: '',
                todoListId:todoListsD1, order: 0, addedDate: ''},
            {id: v1(), title: "GRAPH QL", status: TaskStatuses.New,
                description: '', priority: TaskPriorities.Low, startDate: '', deadline: '',
                todoListId:todoListsD1, order: 0, addedDate: ''},
        ],
        [todoListsD2]:[
            {id: v1(), title: "Beer", status: TaskStatuses.New,
                description: '', priority: TaskPriorities.Low, startDate: '', deadline: '',
                todoListId:todoListsD2, order: 0, addedDate: ''},
            {id: v1(), title: "Fish", status: TaskStatuses.New,
                description: '', priority: TaskPriorities.Low, startDate: '', deadline: '',
                todoListId:todoListsD2, order: 0, addedDate: ''},
            {id: v1(), title: "Chips",status: TaskStatuses.New,
                description: '', priority: TaskPriorities.Low, startDate: '', deadline: '',
                todoListId:todoListsD2, order: 0, addedDate: ''},

        ]
    })


    function changeFilter(todoListID: string, filterValue: FilterValueType) {
       const action = ChangeTodoListFilterAC(todoListID,filterValue)
        dispatchToTodoLists(action)
    }

    function removeTask(taskID: string, todoListID: string) {
      const action = removeTaskAC(taskID,todoListID)
        dispatchToTasks(action)
    }

    function addTask(title: string, todoListID: string) {
       const action = addTaskAC({
           todoListId: todoListID,
           title: title,
           status: TaskStatuses.Completed,
           id: "ggrd",
           addedDate:'',
           deadline: '',
           description: "",
           order: 0,
           priority: 0,
           startDate: ""
       })
        dispatchToTasks(action)
    }

    function changeStatus (taskID: string, status: TaskStatuses, todoListID: string) {
       const action = changeTaskStatusAC(taskID, status,todoListID )
        dispatchToTasks(action)
    }

    function changeTaskTitle (taskID: string, title: string, todoListID: string) {
       const action = changeTaskTitleAC(taskID,title,todoListID)
        dispatchToTasks(action)
    }
    function removeTodolist( todoListID: string) {
      const action = RemoveTodoListAC(todoListID)
        dispatchToTodoLists(action)
        dispatchToTasks(action)

    }

    function addTodoList (title: string){
        const action = AddTodoListAC(title)
       dispatchToTodoLists(action)
        dispatchToTasks(action)
    }

    function changeTodoListTitle (todoListID: string, title:string) {
    const action = ChangeTodoListTitleAC(todoListID,title)
        dispatchToTodoLists(action)
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

export default AppWithReducers;
