import {
    AddTodoListAC,
    ChangeTodoListFilterActionType,
    ChangeTodoListTitleActionType, FilterValueType,
    RemoveTodoListAC, SetTodoListsAC, TodolistDomainType,
    todoListsReducer
} from './todolists-reducer';
import {v1} from 'uuid';


let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistDomainType> = []


beforeEach( () => {
     todolistId1 = v1();
     todolistId2 = v1();

     startState = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: '', order: 0},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: '', order: 0}
    ]
})


test('correct todolist should be removed', () => {


    const endState = todoListsReducer(startState, RemoveTodoListAC(todolistId1) )

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});


test('correct todolist should be added', () => {

    let newTodolistTitle = "New Todolist";

    const endState = todoListsReducer(startState, AddTodoListAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";

    const action: ChangeTodoListTitleActionType = {
        type: 'CHANGE-TODOLIST-TITTLE',
        todoListID: todolistId2,
        title: newTodolistTitle
    };
    const endState = todoListsReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});


test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValueType = "completed";

    const action:ChangeTodoListFilterActionType = {
        type: 'CHANGE-FILTER',
        todoListID: todolistId2,
        filterValue: newFilter
    };

    const endState = todoListsReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});

test('todolists should be set to the state', () => {

   const action = SetTodoListsAC(startState)

    const endState = todoListsReducer([], action);

    expect(endState.length).toBe(2);

});



