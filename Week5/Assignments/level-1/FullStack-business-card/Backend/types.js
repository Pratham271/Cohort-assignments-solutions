const zod = require('zod')

const dataSchema = zod.object({
    title: zod.string(),
    description: zod.string(),
    interests: zod.array(zod.string()),
    links: zod.array(zod.object({
                        name: zod.string(),
                        url: zod.string()
                    }))
});

module.exports = {dataSchema}