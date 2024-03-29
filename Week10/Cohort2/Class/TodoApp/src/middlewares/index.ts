import { PrismaClient } from "@prisma/client";
import  { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from "jsonwebtoken";

const prisma = new PrismaClient()

// const schema = zod.object({
//     title: zod.string().min(3),
//     description: zod.string().min(3)
// })

interface AuthRequest extends Request {
    userId?: number;
}


export default async function authMiddleware(req:AuthRequest,res:Response,next:NextFunction){
    const token:any = req.headers.authorization;
   try {
    const words = token.split(" ")[1]
    const verified = jwt.verify(words,"secret") as JwtPayload
    
    if(!verified){
        return res.status(411).json({
            message: "Invalid token"
        })
    }
    const user = await prisma.user.findUnique({
        where: {
            id:verified.id
        }
    })
    if(!user){
        return res.status(403).json({
            message: "user not found"
        })
    }
    req.userId = user.id;
    next()
   } catch (error:any) {
    res.status(500).json({
        errorMessage: error.message
    })
   }

}