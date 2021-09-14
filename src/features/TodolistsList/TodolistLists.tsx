import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {
    addTodolistTC,
    ChangeTodoListFilterAC, ChangeTodoListTitleTC,
    fetchTodolistsTC,
    FilterValueType, removeTodolistTC,
    TodolistDomainType
} from "../../state/todolists-reducer";
import {addTaskTC, changeTaskTC, removeTaskTC} from "../../state/tasks-reducer";
import {TaskStatuses} from "../../api/todolist-api";
import Grid from "@material-ui/core/Grid";
import AddItemForm from "../../components/AddItemForm/AddItemForm";
import Paper from "@material-ui/core/Paper";
import {Todolist} from "./Todolist/Todolist";
import {TasksStateType} from "../../app/AppWithRedux";

const TodolistLists: React.FC = () => {
    const todoLists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const dispatch = useDispatch()

// Реакт выполни этот юзэффект, зависимости нет, поэтому выполни его один раз, когда ты вмонтируешься
    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])

    const changeFilter = useCallback((todoListID: string, filterValue: FilterValueType) => {
        dispatch(ChangeTodoListFilterAC(todoListID, filterValue))
    }, [dispatch])

    const removeTask = useCallback((taskID: string, todoListID: string) => {
        dispatch(removeTaskTC(taskID, todoListID))

    }, [dispatch])

    const addTask = useCallback((title: string, todoListID: string) => {
        dispatch(addTaskTC(title, todoListID))
    }, [dispatch])

    const changeStatus = useCallback((taskID: string, status: TaskStatuses, todoListID: string) => {
        dispatch(changeTaskTC(taskID, {status}, todoListID))
    }, [dispatch])

    const changeTaskTitle = useCallback((taskID: string, title: string, todoListID: string) => {
        dispatch(changeTaskTC(taskID, {title}, todoListID))
    }, [dispatch])

    const removeTodolist = useCallback((todoListID: string) => {
        dispatch(removeTodolistTC(todoListID))
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])

    const changeTodoListTitle = useCallback((todoListID: string, title: string) => {
        dispatch(ChangeTodoListTitleTC(todoListID, title))
    }, [dispatch])




    return <>
        <Grid container={true} style={{padding: "15px"}}>
            <AddItemForm addItem={addTodoList}/>
        </Grid>
        <Grid container={true} spacing={7}>
            {todoLists.map(tl => {
                let allTodoListTask = tasks[tl.id]
                let taskForTodoList = allTodoListTask;

                return <Grid item>
                    <Paper elevation={3} style={{padding: "15px", borderRadius: "15px"}}>
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
    </>
};


export default TodolistLists;