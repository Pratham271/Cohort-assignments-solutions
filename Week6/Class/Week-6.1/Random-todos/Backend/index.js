const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

const todos = [
    { id: 1, title: "Exercise", description: "30 minutes of jogging"},
    { id: 2, title: "Morning Workout", description: "45 minutes of jogging" },
    { id: 3, title: "Fitness Routine", description: "20 minutes of HIIT workout" },
    { id: 4, title: "Active Session", description: "60 minutes of swimming" },
    { id: 5, title: "Outdoor Exercise", description: "40 minutes of brisk walking" },
    { id: 6, title: "Yoga Practice", description: "30 minutes of yoga" },
    { id: 7, title: "Strength Training", description: "50 minutes of weightlifting" },
    { id: 8, title: "Interval Workout", description: "35 minutes of interval training" },
    { id: 9, title: "Cardio Blast", description: "25 minutes of jump rope" },
    { id: 10, title: "Pilates Session", description: "55 minutes of Pilates" },
    { id: 11, title: "Dance Fitness", description: "30 minutes of dancing" },
]
app.get('/todos', (req,res)=> {
    const firstIndex = Math.floor(Math.random()*3)
    const secondIndex = Math.floor(Math.random()*11)
    let startIndex = 0;
    let endIndex = 0;
    let newTodos = [];
    if(firstIndex<secondIndex){
        startIndex = firstIndex
        endIndex = secondIndex
    }
    else{
        startIndex = secondIndex
        endIndex = firstIndex
    }
    for(let i=startIndex; i<=endIndex; i++){
        newTodos.push(todos[i])
    }
    res.status(200).json({
        newTodos
    })
})

app.listen(3000, ()=> {
    console.log("Listening on port 3000")
})