import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


/*
 * Should insert into the users table
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function createUser(username: string, password: string, name: string) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                username
            }
        })
        if(user){
            return "user already exists"
        }
        const newUser = await prisma.user.create({
            data: {
                username,
                password,
                name
            },
            select: {
                id: true,
                username: true,
                name: true
            }
        })
        return newUser;
    } catch (error) {
        return error
    }
}

/*
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function getUser(userId: number) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id:userId
            },
            select: {
                id:true,
                username: true,
                name: true
            }
        })
        if(!user){
            return "user does not exist"
        }
        return user;
    } catch (error) {
        return error;
    }
}
