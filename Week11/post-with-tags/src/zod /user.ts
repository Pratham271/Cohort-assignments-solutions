import zod from "zod";

export const signupSchema = zod.object({
    username: zod.string().min(3),
    email: zod.string().email(),
    password: zod.string().min(6)
})

export const signinSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6)
})
