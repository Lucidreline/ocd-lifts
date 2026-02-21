import jwt from 'jsonwebtoken'
import { Request, Response, Router } from 'express'
import { prisma } from '../lib/prisma'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
    try {
        const allUserSessions = await prisma.session.findMany();
        res.json(allUserSessions)
    }
})

export default router