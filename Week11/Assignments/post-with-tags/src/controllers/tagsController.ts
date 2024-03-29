import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Context } from "hono";

enum StatusCode{
    BADREQ = 400,
    NOTFOUND = 404,
    NOTPERMISSIOON = 403,
    CREATED = 201,
    SUCCESS = 200,
    SERVERERROR = 500
}
export async function getAllTags(c:Context){
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    try {
        const alltags = await prisma.tags.findMany({})
        if(alltags.length===0 || !alltags){
            return c.body("No tags found",StatusCode.NOTFOUND)
        }
        return c.json({
            alltags
        },StatusCode.SUCCESS)
    } catch (error) {
        c.body(`Internal Server Error ${error}`,StatusCode.SERVERERROR)
    }
}

export async function getTagById(c:Context){
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    const id = Number(c.req.param('id'))
    try {
        const tag = await prisma.tags.findUnique({
            where: {
                id: id
            }
        })
        if(!tag){
            return c.body("No tags found",StatusCode.NOTFOUND)
        }
        return c.json({
            tag
        },StatusCode.SUCCESS)
    } catch (error) {
        c.body(`Internal Server Error ${error}`,StatusCode.SERVERERROR)
    }
}