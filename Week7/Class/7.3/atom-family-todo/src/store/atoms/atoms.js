import { atomFamily, selectorFamily } from "recoil";
import { Todos } from "../../Todos";
import axios from "axios";



export const todosAtomFamily = atomFamily({
    key: 'todosAtomFamily',
    default: selectorFamily({
        key: 'todoSelectorFamily',
        get: (id) => async({get}) => {
            const res = await axios.get(`https://sum-server.100xdevs.com/todo?id=${id}`)
            return res.data.todo
        }
    })
})

// export const todosAtomFamily = atomFamily({
//     key: 'todosAtomFamily',
//     default: id => {
//         return Todos.find(todo => todo.id===id)
//     }
// })

// export const todoAtom = atom({
//     key: "todoAtom",
//     default: Todos
// })
// export const idAtom = atom({
//     key: "idAtom",
//     default: 0
// })

// export const todoSelector = selector({
//     key: "todoSelector",
//     get: ({get}) => {
//         const todos = get(todoAtom)
//         const id = get(idAtom)
//         return todos.find(todo => todo.id===id)
//     }
// })


