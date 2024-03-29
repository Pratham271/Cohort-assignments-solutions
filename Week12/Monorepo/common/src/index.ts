import { z } from "zod";

export const signupSchema = z.object({
    username: z.string(),
    password: z.string()
  })
  
export type signupParams = z.infer<typeof signupSchema>