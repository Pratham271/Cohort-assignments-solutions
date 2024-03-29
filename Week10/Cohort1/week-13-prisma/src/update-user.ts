import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main(){
    const updated = await prisma.user.update({
        where:{
            id:2
        },
        data:{
            email:"newuser@gmail.com"
        }
    })
    console.log(updated)
}

main()
.then(async()=> {
    console.log("user updated successfully")
    await prisma.$disconnect()
})
.catch(async(e)=> {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})