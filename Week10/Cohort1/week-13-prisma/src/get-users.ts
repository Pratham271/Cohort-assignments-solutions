import { PrismaClient } from "@prisma/client";
import { log } from "console";

const prisma = new PrismaClient({log: ['info','query'],});

async function main(){
    const users = await prisma.user.findMany({})
    console.log(users);
    const user = await prisma.user.findUnique({
        where:{
            id: 1
        },
        // to include the posts of the user too
        // it does not use join to do so instead it writes to query to achieve this
        include:{
            posts:true
        }
    })
    console.log(user)
}

main()
.then(async()=> {
    console.log("user found")
    prisma.$disconnect()
})
.catch(async(e)=> {
    console.log(e)
    prisma.$disconnect()
    process.exit(1)
})