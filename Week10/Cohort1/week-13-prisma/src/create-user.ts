import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({log: ['info','query'],});

async function main(){
    await prisma.user.create({
        data: {
            email: "fifthuser@gmail.com",
            name: "user5"
        }
    })
}

main()
.then(async()=> {
    console.log("Done with the query")
    await prisma.$disconnect()
})
.catch(async(e)=> {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1);
})