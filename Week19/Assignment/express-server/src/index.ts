import express from 'express'
import { createClient } from 'redis'
import cors from 'cors'
const app = express()
app.use(cors())
app.use(express.json())
const client = createClient()

app.post("/submit", async(req,res)=> {
    const { problemId, userId, code, language} = req.body

    try {
        await client.lPush("problems", JSON.stringify({problemId, userId, code, language}))
        // ideally you should save it to database first
        res.status(200).send("Submission recieved and stored")
    } catch (error) {
        console.log("Redis error: ",error)
        res.status(500).send("Failed to store submission")
    }
})

async function startServer(){
    try {
        await client.connect()
        console.log("Connected to Redis")

        app.listen(3000, ()=> {
            console.log("App started listening on port 3000")
        })
    } catch (error) {
        console.log('Failed to connect to reddis',error)
    }
}

startServer()