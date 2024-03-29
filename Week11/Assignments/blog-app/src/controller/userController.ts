import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Context } from "hono";
import { Jwt } from "hono/utils/jwt";
import userSchema from "../zod/user";



enum StatusCode{
    BADREQ = 400,
    NOTFOUND = 404,
    NOTPERMISSION = 403,
    SUCCESS = 200,
    CREATED = 201,
    SERVER_ERROR = 500
}

interface User{
    username: string;
    password: string
}
export async function signup(c:Context){
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());

    try {
        const body:User = await c.req.json();
        const parsedBody = userSchema.safeParse(body)
        if(!parsedBody.success){
            return c.body('Invalid user input', StatusCode.BADREQ)
        }

        const user = await prisma.user.findUnique({
            where:{
                username:body.username
            }
        })
        if(user){
            return c.body('User already exists',StatusCode.NOTPERMISSION)
        }

        const newUser = await prisma.user.create({
            data:{
                username: body.username,
                password: body.password
            }
        })
        return c.body('User created', StatusCode.CREATED)
    } catch (error) {
        return c.body(`Internal server error ${error}`,StatusCode.SERVER_ERROR)
    }
}

export async function signin(c:Context){
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try {
        const body:User = await c.req.json()
        const parsedData = userSchema.safeParse(body)
        if(!parsedData.success){
            return c.body("Invalid user input", StatusCode.BADREQ)
        }
        const user = await prisma.user.findUnique({
            where: {
                username: body.username
            }
        })
        if(!user){
            return c.body("User does not exist",StatusCode.NOTFOUND)
        }
        if(user.password!==body.password){
            return c.body("Wrong password", StatusCode.NOTPERMISSION)
        }
        const userId = user.id;
        const token = await Jwt.sign({userId}, c.env.JWT_SECRET);
        return c.json({token}, StatusCode.SUCCESS);
    } catch (error) {
        return c.body("Internal server error",StatusCode.SERVER_ERROR)
    }
}

export async function getAllUsers(c:Context){
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try {
        const users = await prisma.user.findMany({})
        return c.json({users}, StatusCode.SUCCESS)
    } catch (error) {
        return c.body("Internal Server Error",StatusCode.SERVER_ERROR)
    }
}

export async function getUserById(c:Context){
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    try {
        const id = Number(c.req.param('id'));
        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        })
        if(!user){
            return c.body("User not found", StatusCode.NOTFOUND)
        }
        return c.json({user},StatusCode.SUCCESS)
    } catch (error) {
        return c.body("Internal server error", StatusCode.SERVER_ERROR)
    }
}