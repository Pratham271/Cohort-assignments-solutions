import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main(){
    await prisma.post.create({
        data: {
            title: "Third post",
            content: "sasdwdwd",
            published: true,
            author: {
                connect: {
                    id: 3
                }
            }
        }
    })
}

main()
.then(async()=> {
    console.log("posts created successfully")
    await prisma.$disconnect()
})
.catch(async(e)=> {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
})