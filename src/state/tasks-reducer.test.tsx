import {addTaskAC, updateTaskAC,  removeTaskAC, setTaskAC, tasksReducer} from './tasks-reducer';
import {TasksStateType} from '../trash/App';
import {AddTodoListAC, RemoveTodoListAC, SetTodoListsAC} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";

let startState: TasksStateType;

beforeEach( ()=>{
    startState = {
        "todolistId1": [
            { id: "1", title: "CSS", status: TaskStatuses.New,
                description: '', priority: TaskPriorities.Low, startDate: '', deadline: '',
                todoListId:"todolistId1", order: 0, addedDate: '' },
            { id: "2", title: "JS", status: TaskStatuses.Completed,
                description: '', priority: TaskPriorities.Low, startDate: '', deadline: '',
                todoListId:"todolistId1", order: 0, addedDate: '' },
            { id: "3", title: "React", status: TaskStatuses.New,
                description: '', priority: TaskPriorities.Low, startDate: '', deadline: '',
                todoListId:"todolistId1", order: 0, addedDate: '' }
        ],
        "todolistId2": [
            { id: "1", title: "bread", status: TaskStatuses.New,
                description: '', priority: TaskPriorities.Low, startDate: '', deadline: '',
                todoListId:"todolistId2", order: 0, addedDate: '' },
            { id: "2", title: "milk", status: TaskStatuses.Completed,
                description: '', priority: TaskPriorities.Low, startDate: '', deadline: '',
                todoListId:"todolistId2", order: 0, addedDate: '' },
            { id: "3", title: "tea", status: TaskStatuses.New,
                description: '', priority: TaskPriorities.Low, startDate: '', deadline: '',
                todoListId:"todolistId2", order: 0, addedDate: '' }
        ]
    };
})


test('correct task should be deleted from correct array', () => {


    const action = removeTaskAC("2", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            { id: "1", title: "CSS", status: TaskStatuses.New,
                description: '', priority: TaskPriorities.Low, startDate: '', deadline: '',
                todoListId:"todolistId1", order: 0, addedDate: '' },
            { id: "2", title: "JS", status: TaskStatuses.Completed,
                description: '', priority: TaskPriorities.Low, startDate: '', deadline: '',
                todoListId:"todolistId1", order: 0, addedDate: '' },
            { id: "3", title: "React", status: TaskStatuses.New,
                description: '', priority: TaskPriorities.Low, startDate: '', deadline: '',
                todoListId:"todolistId1", order: 0, addedDate: '' }
        ],
        "todolistId2": [
            { id: "1", title: "bread", status: TaskStatuses.New,
                description: '', priority: TaskPriorities.Low, startDate: '', deadline: '',
                todoListId:"todolistId2", order: 0, addedDate: '' },

            { id: "3", title: "tea", status: TaskStatuses.New,
                description: '', priority: TaskPriorities.Low, startDate: '', deadline: '',
                todoListId:"todolistId2", order: 0, addedDate: '' }
        ]
    });

});


test('correct task should be added to correct array', () => {

    const action = addTaskAC({
        todoListId: "todolistId2",
        title: 'juce',
        status: TaskStatuses.Completed,
        id: "ggrd",
        addedDate:'',
        deadline: '',
        description: "",
        order: 0,
        priority: 0,
        startDate: ""
    });

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe('juce');
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.Completed);

})

test('status of specified task should be changed', () => {

    const action = updateTaskAC("2", {status: TaskStatuses.New}, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed);

});

test('taskTitle should be changed', () => {

    const action = updateTaskAC("2", {title:"Sugar"}, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].title).toBe("Sugar");
    expect(endState["todolistId1"][1].title).toBe("JS");


})


test('new array should be added when new todolist is added', () => {

    const action = AddTodoListAC({
        id: '',
        title: 'new',
        addedDate: '',
        order: 0
    });

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {

    const action = RemoveTodoListAC("todolistId2");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});

test('empty arrays should be added when we set todolists', () => {
    const action = SetTodoListsAC([
        {id: '1', title: "title 1", order: 0, addedDate: ''},
        {id: '2', title: "title 2", order: 0, addedDate: ''}
    ])

    const endState = tasksReducer({}, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState['1']).toStrictEqual([])
    expect(endState['2']).toStrictEqual([])

})

test(' tasks should be added for todolists', () => {
    const action = setTaskAC(startState['todolistId1'], 'todolistId1')

    const endState = tasksReducer({
        'todolistId2': [],
        'todolistId1': []
    }, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(0)

})



