import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

import { Context } from "hono";
import { postsSchema } from "../zod /posts";


enum StatusCode{
    BADREQ = 400,
    NOTFOUND = 404,
    NOTPERMISSIOON = 403,
    CREATED = 201,
    SUCCESS = 200,
    SERVERERROR = 500
}

interface Posts {
    title: string;
    description: string;
    tags: string;
}

export async function createPost(c:Context){
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body: Posts = await c.req.json();
    try {
        const parsedData = postsSchema.safeParse(body)
        if(!parsedData.success){
            return c.body("Invalid body",StatusCode.BADREQ)
        }
        
        const tags = body.tags.split(",").map(tag=> tag.trim()) 
        const newPost = await prisma.posts.create({
            data: {
                title: body.title,
                description: body.description,
                userId: c.get("userId"),
                tags: {
                    connectOrCreate: tags.map((tag) => ({
                        where: { tag},
                        create: { tag },
                      })),
                }
            },
            include: {
                tags: true
            }
        })
        return c.json({
            id: newPost.id,
            title: newPost.title,
            description: newPost.description,
            userId : newPost.userId,
            tags: newPost.tags.map((tag)=> tag.tag)
        },StatusCode.CREATED)
    } catch (error) {
        return c.body(`Internal Server Error ${error}`,StatusCode.SERVERERROR)
    }

}

export async function getAllPosts(c:Context){
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const allPosts = await prisma.posts.findMany({
        include: {
            tags: true
        }
    })
    return c.json({
        allPosts
    })
}

export async function getPostById(c:Context){
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    const id = Number(c.req.param('id'))
    try {
        const post = await prisma.posts.findUnique({
            where: {
                id
            },
            include:{
                user : true
            }
        })
        if(!post){
            return c.body('No posts found',StatusCode.NOTFOUND)
        }
        return c.json({
            id: post.id,
            title: post.title,
            description: post.description,
            by: post.user.username
        },StatusCode.SUCCESS)
    } catch (error) {
        return c.body(`Internal Server Error ${error}`,StatusCode.SERVERERROR)
    }
}

export async function updatePost(c:Context){
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    const id = Number(c.req.param('id'))
    const body:Posts = await c.req.json()
    try {
        const tags = body.tags.split(",").map(tag=> tag.trim()) 
        const post = await prisma.posts.findUnique({
            where: {
                id
            }
        })

        if(!post || post===null){
            return c.body('No such post found',StatusCode.NOTFOUND)
        }
        const updatedPost = await prisma.posts.update({
            where: {
                id
            },
            data: {
                title: body.title,
                description: body.description,
                tags: {
                    connectOrCreate: tags.map(tag => ({
                        where: {tag},
                        create: {tag}
                    }))
                }
            },
            include: {
                tags: true
            }
           
        })
        return c.json({
            id: updatedPost.id,
            title: updatedPost.title,
            description: updatedPost.description,
            tags: updatedPost.tags.map(tag => tag)
        })
    } catch (error) {
      return c.body(`Internal Server Error ${error}`,StatusCode.SERVERERROR)
    }
}

export async function deletePost(c:Context){
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    const id = Number(c.req.param('id'))
    try {
        const post = await prisma.posts.findUnique({
            where: {
                id,
                userId: c.get("userId")
            }
        })
        if(!post || post===null){
            return c.body('No such post found',StatusCode.NOTFOUND)
        }
        await prisma.posts.delete({
            where:{
                id,
                userId: c.get("userId")
            }
        })
        return c.json({
            message: 'Post deleted'
        },StatusCode.SUCCESS)
    } catch (error) {
        return c.body(`Internal Server Error ${error}`,StatusCode.SERVERERROR)
    }
}