import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { Request, Response, NextFunction } from 'express';
import authMiddleware from "../middlewares";
import zod from 'zod';

const router = Router();
const prisma = new PrismaClient()

interface todos{
    title: string;
    description: string
}

const schema = zod.object({
    title: zod.string().min(3),
    description: zod.string().min(3)
})

interface AuthRequest extends Request {
    userId?: number;
}

router.post('/create',authMiddleware,async(req: AuthRequest, res: Response)=> {
    const data:todos = req.body
    const userId = req.userId as number;
    try {
        const parsedData = schema.safeParse(data)
        if(!parsedData.success){
            return res.status(411).json({
                message: "Invalid inputs"
            })
        }
        await prisma.todo.create({
            data:{
                title: data.title,
                description: data.description,
                userId:userId 
            }
        })
        res.status(201).json({
            message: "todo successfully created"
        })
    } catch (error:any) {
        res.status(500).json({
            errorMessage: error.message
        })
    }

})

router.get('/', authMiddleware,async(req: AuthRequest, res: Response)=> {
    const userId = req.userId as number;
    try {
        const todos = await prisma.todo.findMany({
            where: {
                userId: userId
            },
            select: {
                title: true,
                description: true
            }
        })
        res.status(200).json({
            todos
        })
    } catch (error:any) {
        res.status(500).json({
            errorMessage: error.message
        })
    }
})

export default router