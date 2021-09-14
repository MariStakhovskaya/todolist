import React from 'react';
import './App.css';
import {AppBar, Button, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import Container from "@material-ui/core/Container";
import {TaskItemType} from "../api/todolist-api";
import TodolistLists from "../features/TodolistsList/TodolistLists";


export type TasksStateType = {
    [key: string]: Array<TaskItemType> }

function AppWithRedux() {
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed={true}>
                <TodolistLists/>
            </Container>

        </div>
    );
}


export default AppWithRedux;
