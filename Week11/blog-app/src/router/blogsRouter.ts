import { Hono } from "hono";
import { authMiddleware } from "../middleware/auth";
import { createBlog, deleteBlog, getAllBlogs, getBlogById, getUserSpecificBlogs, updateBlog } from "../controller/blogsController";


const blogsRouter = new Hono()


blogsRouter.post('/create',authMiddleware,createBlog);
blogsRouter.get('/getAllBlogs',getAllBlogs);
blogsRouter.get('/blog/:id',getBlogById);
blogsRouter.get('/userBlogs/:id',authMiddleware,getUserSpecificBlogs)
blogsRouter.put('/update/:id',authMiddleware,updateBlog)
blogsRouter.delete('/delete/:id',authMiddleware,deleteBlog)




export default blogsRouter;