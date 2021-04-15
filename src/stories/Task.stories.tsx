import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import {action} from "@storybook/addon-actions";
import Task, {TaskPropsType} from "../Task";



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
    task: {taskId: 1,isDone: true ,title: 'JS'},
    todolistId: '1'
};

export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    ...baseArgs,
    task: {taskId: 2,isDone: false ,title: 'HTML'},
    todolistId: '2'
};

