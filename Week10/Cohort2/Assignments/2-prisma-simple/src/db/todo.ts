import { PrismaClient, Todo } from '@prisma/client';

const prisma = new PrismaClient();

/*
 * Function should insert a new todo for this user
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
interface todo {
    id: number
    title: string,
    description: string | null,
    done: boolean
}
export async function createTodo(userId: number, title: string, description: string):Promise<todo> {
    
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })
        if(!user){
            console.log("user does not exist")
        }
        const todo = await prisma.todo.create({
            data: {
                userId,
                title,
                description
            },
            select: {
                id: true,
                title: true,
                description: true,
                done: true
            }
        })
        return todo;
    // }
    // } catch (error) {
    //     console.log(error)
    // }
}
/*
 * mark done as true for this specific todo.
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function updateTodo(todoId: number) {
    try {
        console.log(todoId)
        const todo = await prisma.todo.findUnique({
            where: {
                id: todoId
            }
        })
        console.log(todo)
        if(!todo){
            return "todo not found"
        }
        const updatedTodo = await prisma.todo.update({
            where: {
                id: todoId
            },
            data:{
                done: true
            },
        })
        return updatedTodo;
    } catch (error) {
        return error
    }
}

/*
 *  Get all the todos of a given user
 * Should return an array of todos
 * [{
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }]
 */
export async function getTodos(userId: number) {
    const todos = await prisma.todo.findMany({
        where: {
            userId
        }
    })
    return todos
}