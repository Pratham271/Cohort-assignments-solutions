import { Hono } from "hono";
import { getAllUsers, getUserById, signin, signup } from "../controllers/userController";
import { authMiddleware } from "../middlewares/auth";

const userRouter = new Hono()

userRouter.post('/signup',signup)
userRouter.post('/signin',signin)
userRouter.get('/allUsers',authMiddleware,getAllUsers)
userRouter.get('/userById/:id',authMiddleware,getUserById)

export default userRouter