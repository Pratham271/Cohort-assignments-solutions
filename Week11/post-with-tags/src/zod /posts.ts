import zod from 'zod';

export const postsSchema = zod.object({
    title: zod.string().min(3),
    description: zod.string().min(10),
    tags: zod.string()
})