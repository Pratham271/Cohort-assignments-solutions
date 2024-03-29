import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function createUser(username: string, password: string, firstName: string, lastName:string){
    const response = await prisma.user.create({
        data: {
            username,
            password,
            firstName,
            lastName
        }
    })
    console.log(response)
}

async function getTodos(userId:number){
    const response = await prisma.todo.findMany({
        where: {
            userId: userId
        },
        include:{
            user: true
        }
    })
}

createUser("firstuser","password","Shree", "Ram")
