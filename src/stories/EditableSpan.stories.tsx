import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import {action} from "@storybook/addon-actions";
import EditableSpan, {EditableSpanPropsType} from "../EditableSpan";


export default {
    title: 'Todolist/EditableSpan',
    component: EditableSpan,
    argTypes: {
        getNewTitle: {
            description: 'Value EditableSpan changed'
        },
        value: {
            defaultValue: 'HTML',
            description: 'Start value EditableSpan'
        }
    },
} as Meta;

const Template: Story<EditableSpanPropsType> = (args: EditableSpanPropsType) => <EditableSpan {...args} />;

export const EditableSpanExample = Template.bind({});
EditableSpanExample.args = {
    getNewTitle: action('Value EditableSpan changed')
};


