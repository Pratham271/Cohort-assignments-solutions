const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')

const app = express();
const fileName = path.join(__dirname, 'files/todos.json')
app.use(bodyParser.json());
app.use(express.json())

// middleware built into Express.js. It parses incoming requests with URL-encoded payloads and is based on the body-parser library. The { extended: true } option allows for parsing nested objects in the URL-encoded data.
app.use(express.urlencoded({ extended: true }))

app.get('/todos', (req, res) =>{
  fs.readFile(fileName, (err, data) =>{
    if(err){
      res.status(404).json("File not found")
    }
    else{
      res.status(200).send(data)
    }
  })
})

app.get('/todos/:id', (req, res) =>{
  fs.readFile(fileName, (err, data) => {
    if(err){
      res.status(404).json("File not found")
    }
    else{
      const id = req.params.id;
      const todos = JSON.parse(data)
      for(let i=0; i<todos.length; i++){ // Change data.length to todos.length
        if(id == todos[i].id){
          res.status(200).send(todos[i])
          return; // Exit the loop once a matching todo is found
        }
      }
      res.status(404).json("Todo not found") // If no matching todo is found
    }
  })
})

app.post('/todos', (req, res) =>{
  const {title, description} = req.body;
  fs.readFile(fileName, (err, data) =>{
    if(err){
      res.status(404).json("File not found")
    }
    else{
      const todos = JSON.parse(data)
      todos.push({
        id: todos.length + 1,
        title,
        description
      })
      fs.writeFile(fileName, JSON.stringify(todos), (err) =>{
        if(err){
          res.status(404).json("Error writing to file")
        }
        else{
          res.status(201).json("Todo added successfully")
        }
      });
    }
  });
})

app.put('/todos/:id', (req, res) =>{
    const id = req.params.id;
    const {title, description} = req.body;

    fs.readFile(fileName, (err, data) =>{
      if(err){
        res.status(404).json("File not found")
      }
      else{
        const todo = JSON.parse(data)
        
        for(let i=0; i<todo.length; i++){
            if(id == todo[i].id){
                todo[i].title = title;
                todo[i].description = description;
                
            }
        }
        fs.writeFile(fileName, JSON.stringify(todo), (err=> {
            if(err){
                res.status(500).json("Internal server error")
            }
            else{
                res.status(200).json("File updated successfully")
            }
        }))
      }
    })
  })

app.delete('/todos/:id', (req,res)=> {
    const id = req.params.id;
    let flag = false;
    fs.readFile(fileName, (err,data)=> {
        if(err){
            res.status(404).json("File not found")
        }
        else{
            const todos = JSON.parse(data)
            for(let i=0; i<todos.length; i++){
                if(id==todos[i].id){
                    todos.splice(i,1);
                    flag = true;
                }
            }
            if(!flag){
                res.status(404).json("Id is wrong")
            }
            else{
                fs.writeFile(fileName, JSON.stringify(todos), (err)=> {
                    if(err){
                        res.status(500).json("Internal server error")
                    }
                    else{
                        res.status(200).json("Deleted Successfully")
                    }
                })
            }
            
        }
    })
})

app.listen(3000)