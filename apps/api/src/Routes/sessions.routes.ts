import { Request, Response, Router } from 'express'
import { prisma } from '../lib/prisma.js'
import { authenticate } from '../middleware/authenticate.js'

const router = Router()

interface SessionInput {
    categories: string[]
}

router.get('/', authenticate, async (req: Request, res: Response) => {
    try {
        const allUserSessions = await prisma.session.findMany({
            where: {
                userId: req.userId
            }
        });
        res.json(allUserSessions)
    }
    catch (err) {
        res.status(500).json({ error: `Couldn't find session for ` })
    }
})

router.post('/', authenticate, async (req: Request, res: Response) => {
    const userId = req.userId
    const body = req.body as SessionInput
    try {
        if (!userId) {
            res.status(401).json({ error: 'Unauthorized' })
            return
        }
        const newSession = await prisma.session.create({
            data: {
                ...body,
                userId
            }
        })
        res.json(newSession)
    }
    catch (err) {
        res.status(500).json({ error: `Coudn't find sessions for user ${userId}` })
    }
})

// sets
router.get('/:sessionId/sets', authenticate, async (req: Request, res: Response) => {
    const { sessionId } = req.params
    try {
        const allSessionSets = await prisma.set.findMany({
            where: {
                userId: req.userId,
                sessionId: Number(sessionId)
            }
        })
        res.json(allSessionSets)
    }
    catch (err) {
        res.status(500).json({ error: "Coudn't find your sets for that session." })
    }
})

router.post('/:sessionId/sets', authenticate, async (req: Request, res: Response) => {
    const body = req.body
    const userId = req.userId
    const { sessionId } = req.params
    try {
        const allSessionSets = await prisma.set.create({
            data: {
                ...body,
                sessionId: Number(sessionId),
                userId,


            }
        })
        res.json(allSessionSets)
    }
    catch (err) {
        res.status(500).json({ error: "Coudn't find your sets for that session." })
    }
})

export default router