const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://admin:cTtpmFzMspA7ZhnM@cluster0.wiuyda9.mongodb.net/card")
.then(()=> console.log("connected to mongoose"))
.catch((e)=> console.log(e.message))


const CardSchema = new mongoose.Schema({
    title: String,
    description: String,
    interests: [String],
    links: [{
        name: String,
        url: String
    }]
})

const Card = mongoose.model("card", CardSchema)

module.exports = {
    Card
}