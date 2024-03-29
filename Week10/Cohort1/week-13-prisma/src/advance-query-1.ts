import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main(){
    const usersWithPublished = await prisma.user.findMany({
        where: {
            email:{
                endsWith: "@gmail.com"
            },
            posts: {
                // has atleast one published post
                some: {
                    published: true
                }
            }
        },
        // and include those published posts
        include: {
            posts: {
                where: {
                    // published: true,
                },
            },
        },
    })
    for(let i=0; i<usersWithPublished.length; i++){
        console.log(usersWithPublished)
        usersWithPublished[i].posts.map(post => console.log(post))
    }
}

main()
.then(async()=> {
    console.log()
    await prisma.$disconnect();
})
.catch(async(e)=>{
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})