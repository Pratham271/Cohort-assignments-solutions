import { Hono } from 'hono'
import { cors } from 'hono/cors'
import userRouter from './router/userRouter'
import blogsRouter from './router/blogsRouter'

const app = new Hono();
app.use(cors());

app.route('/api/v1/user', userRouter);
app.route('/api/v1/blogs', blogsRouter);

export default app
