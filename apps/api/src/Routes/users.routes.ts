import { Request, Response, Router } from "express";
import { prisma } from '../lib/prisma.js'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
    try {
        const allUsers = await prisma.user.findMany()
        res.json(allUsers)
    }
    catch (err) {
        res.status(500).json({ error: "Coudn't find Users", err })
    }
})

export default router