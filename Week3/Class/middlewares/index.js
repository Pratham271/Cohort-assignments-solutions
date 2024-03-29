const express = require('express');
const app = express();

app.use(express.json())

// using muddlewares for the precheck
function userMiddleware(req, res, next){
    const username = req.headers.username;
    const password = req.headers.password;
    if(username!='Ram' || password!='Ram@123'){
      res.status(401).send('Unauthorized');
    }
    else{
      next();
    }
  }
  
  function kidneyMiddleware(req, res, next){
    const kidneyId = req.query.kidneyId;
    if(kidneyId!=1 && kidneyId!=2){
      res.status(401).send('Unauthorized');
    }
    else{
      next();
    }
  }
  
  app.get('/health-checkup',userMiddleware,kidneyMiddleware, (req,res)=> {
    res.status(200).json({msg: "Your heart is healthy"})
  })

// doing everything in the route
// app.get('/health-checkup', (req,res)=> {
//   const kidneyId = parseInt(req.query.kidneyId);
//   const username = req.headers.username;
//   const password = req.headers.password;

//   if(username!='Ram' || password!='Ram@123'){
//     res.status(401).send('Unauthorized');
//     return
//   }
//   if(kidneyId!=1 && kidneyId!=2){
//     res.status(400).send('Invalid kidneyId');
//     return
//   }
//   res.status(200).json({msg: "Your heart is healthy"})
// })

app.listen(3000)
