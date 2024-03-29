const express = require("express");
const app = express();

app.use(express.json());

app.post("/health-checkup", (req, res) => {
    const kidneys = req.body.kidneys;
    const kidneyLength = kidneys.length;
    res.send("You have " + kidneyLength + " kidneys");
  
    // if(!kidneys){
    //    res.json({
    //     msg:"wrong input"
    //    });
    // }
    // else{
    //     const kidneyLength = kidneys.length;

    //     res.send("You have " + kidneyLength + " kidneys");
    // }
});

// global catch
let errCount = 0;
app.use((err,req,res,next)=> {
    errCount++;
    if(errCount>5){

        res.status(500).send("Server is down");
        setTimeout(() => {
            process.exit(1);
          }, 100);
    }
  else{
    res.json({
        msg: "Sorry something went wrong"
    })
  }
})

app.listen(3000);
