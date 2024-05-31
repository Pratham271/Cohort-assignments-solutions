import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Context } from "hono";
import { signinSchema, signupSchema } from "../zod /user";
import crypto from "crypto-js";
import { Jwt } from "hono/utils/jwt";

enum StatusCode{
    BADREQ = 400,
    NOTFOUND = 404,
    NOTPERMISSIOON = 403,
    CREATED = 201,
    SUCCESS = 200,
    SERVERERROR = 500
}

interface signupData{
    username: string;
    email: string;
    password: string
}

interface signinData{
    email: string;
    password: string
}

export async function signup(c:Context){
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body:signupData = await c.req.json();
    try {
        const parsedData = signupSchema.safeParse(body);
        if(!parsedData.success){
            return c.body("Invalid arguments",StatusCode.BADREQ)
        }
        const user = await prisma.user.findUnique({
            where:{
                email: body.email
            }
        })
        if(user){
            return c.body("User already exists",StatusCode.NOTPERMISSIOON)
        }
        const hash = String(crypto.SHA256(body.password.toString()))
        await prisma.user.create({
            data: {
                username: body.username,
                email: body.email,
                password: hash
            }
        })
        return c.body("User created successfully", StatusCode.CREATED)
    } catch (error) {
        return c.body(`Internal Server Error ${error}`,StatusCode.SERVERERROR)
    }

}

export async function signin(c:Context){
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    })
    try {
        const body:signinData = await c.req.json()
        const parsedData = signinSchema.safeParse(body)
        if(!parsedData.success){
            return c.body("Invalid arguments",StatusCode.BADREQ)
        }
        const user:any = await prisma.user.findUnique({
            where: {
                email: body.email
            }
        })
        if(!user){
            c.body("No user found with this email",StatusCode.NOTFOUND)
        }
        const verifyPass = crypto.SHA256(body.password).toString()===user.password
        if(!verifyPass){
            return c.body("Wrong inputs",StatusCode.NOTPERMISSIOON)
        }
        const userId = user.id;
        const token = await Jwt.sign({userId},c.env.JWT_SECRET)
        return c.json({
            token
        },StatusCode.SUCCESS)
    } catch (error) {
        return c.body(`Internal Server Error ${error}`,StatusCode.SERVERERROR)
    }
}

export async function getAllUsers(c:Context){
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                username: true,
                email: true
            }
        })
        return c.json({
            users
        },StatusCode.SUCCESS)
    } catch (error) {
        return c.body(`Internal Server Error`,StatusCode.BADREQ)
    }
}

export async function getUserById(c:Context){
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    const id = Number(c.req.param('id'))
    try {
        const user = await prisma.user.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                username: true,
                email: true
            }
        })
        if(!user){
            return c.body("User not found",StatusCode.NOTFOUND)
        }
        return c.json({
            user
        },StatusCode.SUCCESS)
    } catch (error) {
        return c.body(`Internal Server Error ${error}`,StatusCode.SERVERERROR)
    }
}