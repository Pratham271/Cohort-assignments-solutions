const express = require('express')
const app = express();
const cors = require('cors')


app.use(cors())

const todos = [
    {
        id:1,
        title: "todo 1",
        description: "this is todo 1",
        completed: false
    },
    {
        id:2,
        title: "todo 2",
        description: "this is todo 2",
        completed: false
    },
    {
        id:3,
        title: "todo 3",
        description: "this is todo 3",
        completed: false
    },
    {
        id:4,
        title: "todo 4",
        description: "this is todo 4",
        completed: false
    },
    {
        id:5,
        title: "todo 5",
        description: "this is todo 5",
        completed: false
    },
]
app.get('/todos', (req,res)=> {
    const num1 = Math.floor(Math.random()*5)
    const num2 = Math.floor(Math.random()*5)
    const start = num1>num2?num2:num1;
    const end = num1>num2?num1:num2;
    let updatedTodos = [];
    for(let i=start; i<=end; i++){
        updatedTodos.push(todos[i])
    }
    res.json({
        todos: updatedTodos
    })
})

app.listen(3000)