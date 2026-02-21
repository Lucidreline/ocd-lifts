import { Request, Response, Router } from "express";
import { prisma } from '../lib/prisma.js'
import { SignJWT } from 'jose'
import { authenticate } from "../middleware/authenticate.js";

// import { authenticate } from "../middleware/authenticate.js";

interface UserInput {
    username: string
}

const router = Router()

// get all users
router.get('/', async (req: Request, res: Response) => {
    try {
        const allUsers = await prisma.user.findMany({
            include: {
                sessions: true
            }
        })
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
        res.status(500).json({ error: `Couldn't make your boi ${body.username}. Might be a dupe.` })
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

        const secret = new TextEncoder().encode(process.env.JWT_SECRET!)


        const token = await new SignJWT({ userId: user.id })
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime('7d')
            .sign(secret)

        res.json({ token })
    }
    catch (err) {
        res.status(500).json({ error: `Something went wrong: ${err}` })
    }
})

export default router