const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const card = require('./routes/card')

const app = express()

app.use(bodyParser.json())
app.use(express.json())
app.use(cors())

app.use(card)

app.listen(3000, ()=> {
    console.log("listening to port 3000")
})