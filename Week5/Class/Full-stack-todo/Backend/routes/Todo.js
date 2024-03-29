const {Router} = require('express')
const {createTodo,updateTodo} = require('../types')
const {Todos} = require('../db/index')
const router = Router();


router.post('/todo',async(req,res)=> {
   const createPayload = req.body;
   try {
    const parsedPayload = createTodo.safeParse(createPayload)
   if(!parsedPayload.success){
    return res.status(411).json({
        message: "Invalid inputs"
    })
   }
   const todo = await Todos.findOne({
    Title: createPayload.Title
   })
   if(todo){
    return res.status(403).json({
        message: "Duplicate values"
    })
   }
   await Todos.create({
    Title: createPayload.Title,
    Description: createPayload.Description,
   })
   res.status(201).json({
    message: "Todo created successfully"
   })
   } catch (error) {
        res.status(500).json({
            ErrorMesage: error.message
        })
   }
})

router.get('/todos', async(req,res)=> {
    const todos = await Todos.find({})
    res.status(200).json({
        todos
    })
})

router.put('/completed', async(req,res)=> {
    const updatePayload = req.body;
    try {
        const parsedPayload = updateTodo.safeParse(updatePayload)
        if(!parsedPayload.success){
            return res.status(411).json({
                message: "Invalid inputs"
            })
        }
        await Todos.updateOne({
            _id: req.body.id
        },{
            Completed: true
        })
        res.status(200).json({
            message: "Todo updated"
        })
    } catch (error) {
        res.status(500).json({
            ErrorMessage: error.message
        })
    }
})


module.exports = router;