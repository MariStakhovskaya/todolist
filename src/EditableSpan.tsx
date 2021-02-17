import React, {ChangeEvent, useState} from "react";
import TextField from "@material-ui/core/TextField";

type EditableSpanPropsType ={
    value: string
    getNewTitle: (title:string) => void
}


function EditableSpan(props:EditableSpanPropsType) {
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
}

export default EditableSpan;