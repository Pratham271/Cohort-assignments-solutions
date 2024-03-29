const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const todoRouter = require('./routes/Todo')

const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(express.json())

app.use(todoRouter)
app.listen(3000, ()=>{
    console.log("Listening on port 3000")
})