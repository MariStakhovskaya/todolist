export type StateType = {
    name: string
    age: number
    childrenCount: number
}

// 3 типа действия: action type!!!
// описание (тип) действия и (возможно!!!) какие-то параметры

//чистая ф-ия, это ф-ия, которая при одних и тех параметрах возвращает один и тот же результат. Чистая ф-ия не должна иметь побочных эффектов,
// т.е. все что ф-ия сделала у нее должно быть в ретурне

type ActionType = {
    type: string
    [key: string]: any
}

export const userReducer = (state: StateType, action:ActionType) =>{

    switch (action.type){
        case 'INCREMENT-AGE' :
            let newState = {...state}
            newState.age = state.age + 1;
            return newState;

        case 'INCREMENT-CHILDREN-COUNT':
           /* state.childrenCount = state.childrenCount +1 ;*/
            return {...state, childrenCount: state.childrenCount +1 } ;
        case 'CHANGE-NAME':

            return{...state, name: action.newName};
        default:
           throw new Error("I dont understand this type")

    }

}