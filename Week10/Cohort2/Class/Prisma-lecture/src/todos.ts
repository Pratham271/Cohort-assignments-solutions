import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createTodo(userId: number, title: string, description:string){
    const response = await prisma.todo.create({
        data: {
            userId,
            title,
            description
        }
    })
    console.log(response)
}

async function getTodos(userId:number){
    const response = await prisma.todo.findMany({
        where: {
            userId
        }
    })
    console.log(response)
}

async function getTodosAndUserDetails(userId: number){
    // const response = await prisma.user.findMany({
    //     where: {
    //         id:userId,
    //         // has atleast one todo marked as done
    //         // todos:{
    //         //     some: {
    //         //         done: true
    //         //     }
    //         // }
    //     },
    //     include: {
    //         todos: {
    //             where: {
    //                 userId
    //             }
    //         }
    //     }
        
    // })
    const response = await prisma.todo.findMany({
        where: {
            userId,
        },
        select: {
            user: true,
            title: true,
            description: true
        }
    })
    console.log(response)
}
// createTodo(1,"secondtodo","firstUserSecondtodo")
// .then(async()=> {
//     await prisma.$disconnect()
// })
// .catch(async(e)=> {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
// })

getTodosAndUserDetails(1)