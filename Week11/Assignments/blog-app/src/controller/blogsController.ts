import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Context } from "hono";
import blogSchema from "../zod/blogs";

enum StatusCode{
    BADREQ = 400,
    NOTFOUND = 404,
    NOTPERMISSION = 403,
    SUCCESS = 200,
    CREATED = 201,
    SERVER_ERROR = 500
}

interface blogs{
    title:string;
    body:string;
}

export async function createBlog(c:Context) {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    const userId = c.get("userId")
    const body:blogs = await c.req.json();
    try {
        const parsedData = blogSchema.safeParse(body)
        if(!parsedData.success){
            return c.body("Invalid inputs",StatusCode.BADREQ);
        }
        const user = await prisma.blogs.create({
            data: {
                userId,
                title: body.title,
                body: body.body
            }
        });
        return c.body("Blogs created successfully",StatusCode.CREATED)
    } catch (error) {
        return c.body(`Internal server error ${error}`,StatusCode.SERVER_ERROR)
    }
    
}

export async function getAllBlogs(c:Context){
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    try {
        const blogs = await prisma.blogs.findMany({
            include: {
                user: true
            }
        })
        return c.json({
            blogs: blogs.map((blog) => ({
                id: blog.id,
                title: blog.title,
                body: blog.body,
                userId: blog.userId,
                username: blog.user.username
            }))
        },StatusCode.SUCCESS)
    } catch (error) {
        return c.body(`Internal server error : ${error}`,StatusCode.SERVER_ERROR)
    }
}

export async function getUserBlogs(c:Context){
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    try {
        const blogs = await prisma.blogs.findMany({
            where: {
                userId: c.get("userId")
            }
        })
        return c.json({blogs}, StatusCode.SUCCESS)
    } catch (error) {
        return c.body(`Internal server error : ${error}`,StatusCode.SERVER_ERROR)
    }
}

export async function getBlogById(c:Context){
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    const id = Number(c.req.param('id'))
    try {
        const blog = await prisma.blogs.findUnique({
            where:{
                id: id
            },
            include: {
                user: true
            }
        })
        if(!blog){
            return c.body("Blog does not exist", StatusCode.NOTFOUND);
        }
        return c.json({
            id: blog.id,
            title: blog.title,
            body: blog.body,
            userId: blog.userId,
            username: blog.user.username
        },StatusCode.SUCCESS)
    } catch (error) {
        return c.body(`Internal Server Error ${error}`,StatusCode.SERVER_ERROR)
    }
}

export async function getUserSpecificBlogs(c:Context){
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    const userId = Number(c.req.param('id'))
    try {
        const blogs = await prisma.blogs.findMany({
            where: {
                userId
            },
            include: {
                user: true
            }
        })
        if(blogs.length===0){
            return c.body("No blogs found",StatusCode.NOTFOUND)
        }
        return c.json({
            message: `Found all the blogs`,
            response: blogs.map(blog=> ({
                id: blog.id,
                title: blog.title,
                body: blog.body,
                userId: blog.userId,
                username : blog.user.username
            }))
        },StatusCode.SUCCESS)
    } catch (error) {
        return c.body(`Internal server error ${error}`, StatusCode.SERVER_ERROR)
    }
}

export async function updateBlog(c:Context){
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    const id = Number(c.req.param('id'))
    const body:blogs = await c.req.json()
    try {
        const parsedData = blogSchema.safeParse(body)
        if(!parsedData.success){
            return c.body("Invalid inputs",StatusCode.BADREQ);
        }
        const blog = await prisma.blogs.findUnique({
            where: {
                id
            }
        })
        if(!blog){
            return c.body("Blog not exist",StatusCode.NOTFOUND)
        }
        const updatedBlog = await prisma.blogs.update({
            where: {
                id
            },
            data: {
                title: body.title,
                body: body.body
            },
            include: {
                user: true
            }
        })
        return c.json({
            message: "Blog updated successfully",
            id: updatedBlog.id,
            title: updatedBlog.title,
            body: updatedBlog.body,
            userId: updatedBlog.userId,
            username: updatedBlog.user.username
        },StatusCode.SUCCESS)
    } catch (error) {
        return c.body(`Internal server error ${error}`,StatusCode.SERVER_ERROR)
    }
}

export async function deleteBlog(c:Context){
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    const id = Number(c.req.param('id'))
    try {
        const deletedBlog = await prisma.blogs.delete({
            where: {
                id
            }
        })
        return c.json({
            message: "Blog successfully deleted",
            id: deletedBlog.id,
            title: deletedBlog.title,
        },StatusCode.SUCCESS)
    } catch (error) {
        return c.body(`Internal server error`,StatusCode.SERVER_ERROR)
    }
}