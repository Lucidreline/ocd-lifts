import { Request, Response, Router } from 'express'
import { prisma } from '../lib/prisma.js'
import { authenticate } from '../middleware/authenticate.js'

interface SessionInput {
    categories: string[]
}

interface setInput {
    exerciseId: number,
    intensity: number,
    notes: string,
    repCount: number,
    weightLbs: number
}

const router = Router()

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
            },
            include: {
                exercise: {
                    include: {
                        muscleGroups: true
                    }
                }
            }
        })
        res.json(allSessionSets)
    }
    catch (err) {
        res.status(500).json({ error: "Coudn't find your sets for that session." })
    }
})

interface prInput {
    userId: number
    sessionId: number
    exerciseId: number
    setId: number
    score: number
    weightLbs: number
    repCount: number
}

const isPr = async (body: prInput) => {
    const exercisePrs = await prisma.pR.findMany({
        where: { exerciseId: body.exerciseId }
    })

    if (exercisePrs.length === 0) return true

    const bestScore = Math.max(...exercisePrs.map(pr => pr.score))
    return body.score > bestScore
}

const createPr = async (body: prInput) => {
    try {
        const newPr = await prisma.pR.create({
            data: body
        })
        return newPr
    }
    catch (err) {
        return {}
    }
}

router.post('/:sessionId/sets', authenticate, async (req: Request, res: Response) => {
    const body = req.body as setInput
    const userId = req.userId

    if (!userId) {
        res.status(401).json({ error: 'Unauthorized' })
        return
    }

    let score;
    if (body.weightLbs == 0)
        score = body.repCount
    else
        score = body.repCount * body.weightLbs

    const { sessionId } = req.params
    try {
        const createdSet = await prisma.set.create({
            data: {
                ...body,
                sessionId: Number(sessionId),
                userId,
                score
            }
        })

        const prBody = {
            userId,
            sessionId: Number(sessionId),
            exerciseId: body.exerciseId,
            setId: createdSet.id,
            score,
            weightLbs: body.weightLbs,
            repCount: body.repCount
        } as prInput

        if (await isPr(prBody)) {
            console.log("Yoo you hit a PR")
            createPr(prBody)
        }


        res.json({ ...createdSet, pr: prBody })
    }
    catch (err) {
        res.status(500).json({ error: "Coudn't create your set." })
    }
})

export default router