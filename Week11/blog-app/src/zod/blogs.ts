import zod from "zod";

const blogSchema = zod.object({
    title: zod.string().min(5),
    body: zod.string().min(10)
})

export default blogSchema;