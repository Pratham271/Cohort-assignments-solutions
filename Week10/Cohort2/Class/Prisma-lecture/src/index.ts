import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function insertUser(username: string, password: string, firstName: string, lastName: string){
    const response = await prisma.user.create({
        data: {
            email:username,
            password,
            firstName,
            lastName
        },
        // this returns the fields that you select  
        // select:{
        //     id:true,
        //     password:true
        // }
    })
    console.log(response)
    
}

interface UpdateParams {
    firstName: string;
    lastName: string;
}

async function updateUser(username:string,{firstName,lastName}:UpdateParams){
    const response = await prisma.user.update({
        where: {
            email:username,
        },
        data:{
            firstName,
            lastName
        }
    })
    console.log(response)
}


async function getUser(username:string){
    const response = await prisma.user.findFirst({
        where:{
            email:username
        }
    })
    console.log(response)
}

async function getAllUser(){
    const resposne = await prisma.user.findMany({
        // select: {
        //     firstName:true,
        //     lastName: true
        // }
    })
    console.log(resposne)
}


// insertUser("seconduser@gmail.com","password1","second","user")
// .then(async()=> {
//     console.log("User created successfully")
//     await prisma.$disconnect();
// })
// .catch(async(e)=> {
//     console.error(e)
//     await prisma.$disconnect();
//     process.exit(1);
// })

getAllUser()
// updateUser("firstuser@gmail.com",{firstName:"newFirst",lastName:"user1"})
// .then(async()=> {
//     console.log("User created successfully")
//     await prisma.$disconnect();
// })
// .catch(async(e)=> {
//     console.error(e)
//     await prisma.$disconnect();
//     process.exit(1);
// })

// getUser("firstuser@gmail.com")
// .then(async()=> {
//     await prisma.$disconnect()
// })
// .catch(async(e)=> {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
// })