const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://admin:cTtpmFzMspA7ZhnM@cluster0.wiuyda9.mongodb.net/Todo")
.then(()=> {console.log("Connected to mongo")})
.catch(e => console.log(e.message))

const TodoSchema = new mongoose.Schema({
    Title: String,
    Description: String,
    Completed: {
        type: Boolean,
        default: false
    }
})

const Todos = mongoose.model("Todos", TodoSchema)

module.exports = {Todos}