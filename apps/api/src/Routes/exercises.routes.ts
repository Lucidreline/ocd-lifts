import { Request, Response, Router } from "express";
import { prisma } from '../lib/prisma.js'
import { authenticate } from "../middleware/authenticate.js";

interface exerciseInput {
    name: string
    variation: string
    repRange: string
    muscleGroups: muscleGroupInput[]
}

interface muscleGroupInput {
    priority: number
    vagueName: string
    specificName: string
}

const router = Router()

router.get('/', authenticate, async (req: Request, res: Response) => {
    const userId = req.userId

    try {
        const allUserExercises = await prisma.exercise.findMany({
            where: {
                userId
            },
            include: {
                muscleGroups: true
            }
        })

        res.json(allUserExercises)
    }
    catch (err) {
        res.status(500).json({ error: "Coudn't find your exercises :(" })
    }
})

router.post('/', authenticate, async (req: Request, res: Response) => {
    const userId = req.userId
    const body = req.body as exerciseInput

    if (!userId) {
        res.status(401).json({ error: 'Unauthorized' })
        return
    }


    try {
        const newExercise = await prisma.exercise.create({
            data: {
                ...body,
                userId,
                muscleGroups: {
                    create: body.muscleGroups
                }

            }
        })
    } catch (err) {
        res.status(500).json({ error: `Coudn't create your excersise!!` })
    }
})

export default router
