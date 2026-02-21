import { Request, Response, Router } from "express";
import { prisma } from '../lib/prisma.js'
import jwt from 'jsonwebtoken'

interface UserInput {
    username: string
}

const router = Router()

// get all users
router.get('/', async (req: Request, res: Response) => {
    try {
        const allUsers = await prisma.user.findMany()
        res.json(allUsers)
    }
    catch (err) {
        res.status(500).json({ error: "Coudn't find Users", err })
    }
})

router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: Number(id)
            }
        })
        res.json(user)
    }
    catch (err) {
        res.status(500).json({ error: `Coudn't find user with id ${id}` })
    }
})

// create new user
router.post('/', async (req: Request, res: Response) => {
    const body = req.body as UserInput
    try {
        const newUser = await prisma.user.create({
            data: body
        })
        res.json(newUser)
    }
    catch (err) {
        res.status(500).json({ msg: `Couldn't make your boi ${body.username}` })
    }
})

router.post('/login', async (req: Request, res: Response) => {
    const { username } = req.body as UserInput

    try {
        const user = await prisma.user.findUnique({
            where: { username }
        })

        if (!user) {
            res.status(404).json({ error: `Couldn't find your boi ${username}` })
            return
        }

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET!,
            { expiresIn: '7d' }
        )

        res.json({ token })
    }
    catch (err) {
        res.status(500).json({ error: `Something went wrong: ${err}` })
    }
})

export default router