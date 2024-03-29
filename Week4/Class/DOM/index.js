const express = require('express')
const app = express();
const cors = require('cors')
app.use(express.json())
app.use(cors())
app.get('/sum', (req,res)=> {
    const num1 = parseInt(req.query.n1);
    const num2 = parseInt(req.query.n2);

    const ans = num1+num2;
    

    res.send(ans.toString())
})

app.get('/interest',(req,res)=> {
    const principal = parseInt(req.query.p);
    const rate = parseInt(req.query.r)
    const time = parseInt(req.query.t)

    const interest = parseFloat((principal*rate*time)/100);
    const amount = principal+interest;
    res.json({
        interest: interest,
        total: amount
    })
})

app.listen(3000)