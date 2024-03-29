import { Hono } from "hono";
import { authMiddleware } from "../middlewares/auth";
import { createPost, deletePost, getAllPosts, getPostById, updatePost } from "../controllers/postsController";

const postsRouter = new Hono();

postsRouter.post('/create',authMiddleware,createPost)
postsRouter.get('/allPosts',getAllPosts)
postsRouter.get('/post/:id',authMiddleware,getPostById)
postsRouter.get('/posts',authMiddleware)
postsRouter.put('/update/:id', authMiddleware,updatePost)
postsRouter.delete('/delete/:id', authMiddleware,deletePost)

export default postsRouter;