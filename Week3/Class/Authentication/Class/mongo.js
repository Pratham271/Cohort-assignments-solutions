const mongoose = require('mongoose');
const express = require('express');

const app = express();
app.use(express.json())

mongoose.connect(
    "mongodb+srv://admin:cTtpmFzMspA7ZhnM@cluster0.wiuyda9.mongodb.net/user_app",
  );

const User = mongoose.model('User',{
  name: String,
  email: String,
  password: String,
  age: Number,
})

app.post('/signup', async (req,res)=> {
  const {name,email,password,age} = req.body;

  const existingUser = await User.findOne({email: email});
  if(existingUser){
    res.status(400).send('User already exists');
  }
 
    const user = new User({
      name: name,
      email: email,
      password: password,
      age: age,
    })

    user.save()
    res.json(
      {msg: 'User created successfully'}
    )
 
 
})

app.listen(3000)