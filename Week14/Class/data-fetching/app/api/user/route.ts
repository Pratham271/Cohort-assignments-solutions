import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient()
export function GET(){
    return Response.json({
        email: "prathamchauhan@gmail.com",
        name : "Pratham"
    })
}
export async function POST(req:NextRequest){
    // extract the body 
    const body = await req.json()
    console.log(body)
    // store the body 
    await prisma.user.create({
        data: {
            username:body.username,
            password: body.password
        }
    })
    
    return Response.json({
        message: "logged in"
    })
}