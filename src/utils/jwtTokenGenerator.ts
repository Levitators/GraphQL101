import { sign } from "jsonwebtoken"

export const genToken = (userId: number) => sign({userId }, process.env.JWT_SECRET as string)
