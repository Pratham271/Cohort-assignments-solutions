import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import zod from "zod";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();
const router = Router();

interface User{
    username: string;
    password: string;
}
const schema = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

// signup a user
router.post('/signup', async(req,res)=> {
    const data:User = req.body
    try {
        const parsedData = schema.safeParse(data)
        if(!parsedData.success){
            return res.status(411).json({
                message: "wrong inputs"
            })
        }
        
        const user = await prisma.user.findUnique({
            where: {
               username: data.username
            }
        })
        if(user){
            return res.status(403).json({
                message: "user exists"
            })
        }
        await prisma.user.create({
            data: {
                username: data.username,
                password: data.password
            }
        })
        res.status(201).json({
            message: "user created successfully"
        })
    } catch (error:any) {
        res.status(500).json({
            errorMessage: error.message
        })
    }
})

// signin a user
router.post('/signin', async(req,res)=> {
    const data:User = req.body;
    try {
        const parsedData = schema.safeParse(data)
        if(!parsedData.success){
            return res.status(411).json({
                message: "wrong inputs"
            })
        }
        const user = await prisma.user.findUnique({
            where: {
                username: data.username,
            }
        })
        if(!user){
            return res.status(403).json({
                message: "user does not exists"
            })
        }
        const token = jwt.sign({id:user.id},"secret")
        res.status(200).json({
            token: token
        })
    } catch (error:any) {
        res.status(500).json({
            errorMessage: error.message
        })
    }
})

// get all users
router.get('/allusers', async(req,res)=> {
    const users = await prisma.user.findMany({})
    res.status(200).json({
        users
    })
})

// get a specific user by id
router.get('/:id', async(req,res)=> {
    const userId:number = parseInt(req.params.id)
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })
        if(!user){
            return res.status(404).json({
                message: "User not found"
            })
        }
        res.status(200).json({
            user
        })
    } catch (error:any) {
        res.status(500).json({
            errorMessage: error.message
        })
    }
})

export default router;