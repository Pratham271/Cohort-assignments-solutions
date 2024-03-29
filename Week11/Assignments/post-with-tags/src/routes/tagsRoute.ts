import { Hono } from "hono";
import { authMiddleware } from "../middlewares/auth";
import { getAllTags, getTagById } from "../controllers/tagsController";

const tagsRouter = new Hono()

tagsRouter.get('/allTags',getAllTags)
tagsRouter.get('tag/:id',getTagById)
export default tagsRouter;