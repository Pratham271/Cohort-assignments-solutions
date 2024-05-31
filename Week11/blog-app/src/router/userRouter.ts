import { Hono } from "hono";
import { getAllUsers, getUserById, signin, signup } from "../controller/userController";

const userRouter = new Hono();

userRouter.post('/signup',signup);
userRouter.post('/signin',signin);

userRouter.get('/users',getAllUsers);
userRouter.get('/:id',getUserById);

export default userRouter;