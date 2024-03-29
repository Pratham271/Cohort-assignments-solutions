import { Hono } from 'hono'
import { cors } from 'hono/cors'
import userRouter from './routes/userRoutes'
import postsRouter from './routes/postsRoute'
import tagsRouter from './routes/tagsRoute'


const app = new Hono()
app.use(cors())

app.route('/api/v1/user',userRouter)
app.route('/api/v1/posts',postsRouter)
app.route('/api/v1/tags',tagsRouter)


export default app
