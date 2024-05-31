import { Context, Next } from "hono";
import { Jwt } from "hono/utils/jwt";

export async function authMiddleware(c:Context,next:Next){
  const token = c.req.header('Authorization');

  try {
    if(!token || !token.startsWith('Bearer')){
      return c.body('Invalid token', 403)
    } 
        const authToken = token?.split(" ")[1];
        const verified = await Jwt.verify(authToken as string,c.env.JWT_SECRET)
        if(!verified){
            return c.body("Wrong token",411)
        }
        c.set("userId",verified.userId);
        await next();
  } catch (error) {
    return c.body("Internal server error",500)
  }
  
}