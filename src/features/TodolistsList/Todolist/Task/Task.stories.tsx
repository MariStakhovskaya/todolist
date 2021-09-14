import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import {action} from "@storybook/addon-actions";
import Task, {TaskPropsType} from "./Task";
import {TaskPriorities, TaskStatuses} from "../../../../api/todolist-api";



export default {
    title: 'Todolist/Task',
    component: Task,
} as Meta;

const ChangeTaskStatusCallback = action('Status changed inside Task')
const ChangeTaskTitleCallback = action('Title changed inside Task')
const RemoveTaskCallback = action('Remove Button  inside Task clicked')

const Template: Story<TaskPropsType> = (args: TaskPropsType) => <Task {...args} />;

const baseArgs = {
    removeTask: RemoveTaskCallback,
    changeStatus:ChangeTaskStatusCallback,
    changeTaskTitle: ChangeTaskTitleCallback
}

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
    ...baseArgs,
    task: {id: '1',title: 'JS', status: TaskStatuses.Completed,
        description: '', priority: TaskPriorities.Low, startDate: '', deadline: '',
        todoListId:"1", order: 0, addedDate: ''},
    todolistId: '1'
};

export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    ...baseArgs,
    task: {id: '2',title: 'HTML',status: TaskStatuses.New,
        description: '', priority: TaskPriorities.Low, startDate: '', deadline: '',
        todoListId:"2", order: 0, addedDate: '' },
    todolistId: '2'
};

