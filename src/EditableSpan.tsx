import React, {ChangeEvent, useState} from "react";
import TextField from "@material-ui/core/TextField";

type EditableSpanPropsType ={
    value: string
    getNewTitle: (title:string) => void
}


export const EditableSpan = React.memo((props:EditableSpanPropsType) => {
    console.log("EditableSpan called");
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.value)

const onEditMode = () => {setEditMode(true)}
const offEditMode = () => {setEditMode(false)
    if (title.trim()) {
        props.getNewTitle(title.trim())
    }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }


    return (
        editMode
            ? <TextField size="small"
                value={title}
                onBlur={offEditMode}
                autoFocus={true}
                onChange={onChangeHandler} />
            : <span onDoubleClick={onEditMode}>{props.value}</span>
    )
})

export default EditableSpan;