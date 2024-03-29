import { Context,Next } from "hono";
import { Jwt } from "hono/utils/jwt";

export async function authMiddleware(c:Context, next:Next){
    const token = c.req.header('authorization');
    try {
        if(!token || !token.startsWith('Bearer')){
            return c.body("Invalid Token",411)
        }
        const words = token.split(" ")[1];
        const verified = await Jwt.verify(words,c.env.JWT_SECRET)
        
        if(!verified){
            return c.body("Not authorized",403)
        }
        c.set("userId",verified.userId)
        await next();
    } catch (error) {
        return c.body(`Internal Server Error ${error}`,500);
    }
}