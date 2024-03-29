import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({log: ['info','query']})


// SELECT * FROM posts OFFSET 0 LIMIT 10 = TAKE 10 SKIP 0
// SELECT * FROM posts OFFSET 100 LIMIT 10 = TAKE 10 SKIP 10
// SELECT * FROM posts OFFSET 200 LIMIT 10 = TAKE 10 SKIP 20
// THIS IS CALLED PAGINATION/FILTERING AS WE ARE PROVIDING SOME OUTPUT PER PAGE RATHER THAN RENDERING THE WHOLE THING AT ONCE
async function main(){
    const res = await prisma.post.findMany({
        take:2,
        skip:0
    })

    console.log(res)
}

main()
.then(async()=> {
    await prisma.$disconnect()
})
.catch(async(e)=> {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})
