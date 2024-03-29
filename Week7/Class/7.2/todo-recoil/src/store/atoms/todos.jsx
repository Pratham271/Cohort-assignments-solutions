import { atom, selector } from "recoil";


export const titleState = atom({
    key: 'titleState',
    default: '',
})

export const descriptionState = atom({
    key: 'descriptionState',
    default: '',
})

export const todosState = atom({
    key: 'todosState',
    default: [],
})

export const filterTodos = atom({
    key: 'filterTodos',
    default: ''
})

export const filtered = selector({
    key: 'filtered',
    get: ({get}) => {
        const filter = get(filterTodos);
        const todos = get(todosState)

        return todos.filter((todo)=> {return todo.title.toLowerCase().includes(filter.toLowerCase())})
    }
})