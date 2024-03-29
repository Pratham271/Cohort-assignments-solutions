const express = require("express");
const zod = require("zod");

const app = express();


const schema = zod.array(zod.number());

const schema1 = zod.object({
    email: zod.string().min(1,{message: "This field has to be filled"}).email(),
    password: zod.string(),
    country: zod.literal("IN").or(zod.literal("US"))
})

app.use(express.json());

app.post("/health-checkup", (req, res) => {
    const kidneys = req.body.kidneys;
    const response = schema.safeParse(kidneys)

    res.send({
        response
    })
    
});


app.use((error,req,res,next)=> {
    res.send("Something went wrong")
})



app.listen(3000);
