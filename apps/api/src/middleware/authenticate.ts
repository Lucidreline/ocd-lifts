import { jwtVerify } from 'jose'
import { Request, Response, NextFunction } from 'express'

const secret = new TextEncoder().encode(process.env.JWT_SECRET!)

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return res.status(401).json({ error: 'No token provided' })

    try {
        const { payload } = await jwtVerify(token, secret)
        req.userId = payload.userId as number
        next()
    } catch {
        res.status(401).json({ error: 'Invalid token' })
    }
}