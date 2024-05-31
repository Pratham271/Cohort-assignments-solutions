const {Router} = require('express')
const { Card } = require('../db')
const {dataSchema} = require('../types')
const router = Router()

router.post('/card', async(req,res)=> {
    const data = req.body;
    try {
        const parsedData = dataSchema.safeParse(data)
        if(!parsedData.success){
            return res.status(411).json({
                message: "Invalid inputs"
            })
        }
        await Card.create({
            title: data.title,
            description: data.description,
            interests: data.interests,
            links: data.links
        })
        res.status(201).json({
            message: "Data added successfully"
        })
    } catch (error) {
        res.status(500).json({
            errorMessage: error.message 
        })
    }
})

router.get('/cards', async(req,res)=> {
   const cards =  await Card.find({})
    res.status(200).json({
        cards
    })
})

router.get('/card/:id', async(req,res)=> {
    const id = req.params.id;
    const card = await Card.findById(id)
    res.status(200).json({
        card
    })
})

router.put('/card', async(req,res)=> {
    const id = req.headers.id
    const data = req.body;
    try {
        const parsedData = dataSchema.safeParse(data)
        if(!parsedData.success){
            return res.status(411).json({
                message: "Invalid inputs"
            })
        }
        await Card.updateOne({_id:id }, {   
            title: "Harkirat",
            description: data.description,
            interests: data.interests,
            links: data.links
        })
        res.status(200).json({
            message: "Data updated successfully"
        })
    } catch (error) {
        res.status(500).json({
            errorMessage: error.message
        })
    }
})

router.delete('/card', async(req,res)=> {
    const id = req.headers.id
    try {
        await Card.deleteOne({_id:id})
        res.status(200).json({
            message: "Card deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            errorMessage: error.message
        })
    }
})

module.exports = router