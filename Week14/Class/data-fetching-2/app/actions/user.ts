"use server"

import prisma from "@/db";

export async function Signup(email: string, name:string ,password: string){
    try {
        // const body = await req.json()
        // console.log(body)
        // headers
        // console.log(req.headers.get("authorization"))

        // // query parameters
        // console.log(req.nextUrl.searchParams.get("name"))

        await prisma.user.create({
            data:{
                email: email,
                name: name,
                password: password
            }
        })

        return true
    } catch (error) {
        console.log(error)
        return false
    }
}