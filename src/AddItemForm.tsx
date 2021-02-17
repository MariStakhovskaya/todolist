import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";


type AddItemFormPropsType ={
    addItem: (title: string)=> void
}


function AddItemForm(props: AddItemFormPropsType) {
    const [title, setTitle] = useState<string>("")
    const [error, setError] =useState<string|null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") addItem()
    }

    const addItem = () => {
        //обрезаем пробелы с двух сторон
        const trimmedTitle = title.trim()
        if(trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError("Tittle is required!")
        }
        setTitle("")
    }


    return (
    <div>
            <TextField variant="outlined" size="small"  value={title}
                        onChange={onChangeHandler}
                        onKeyPress={onKeyPressHandler}
                       error={!!error}
            label="Title"
            helperText={error}/>
       {/* <input
            value={title}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            className={ error ? "error" : ""}
        />*/}
        {/*<button onClick={addItem}>+</button>*/}
        {/*<Button variant="contained" color="primary" size="medium" onClick={addItem}>+</Button>*/}
        <IconButton color="primary" onClick={addItem}>
            <AddBox/>
        </IconButton>

    </div>
    )
}

export default AddItemForm

