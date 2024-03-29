import zod from 'zod'

const userSchema = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6)
})

export default userSchema