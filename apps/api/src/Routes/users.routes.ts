import { Request, Response, Router } from "express";
import { prisma } from '../lib/prisma.js'

interface CreateUserInput {
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

// create new user
router.post('/', async (req: Request, res: Response) => {
    const body = req.body as CreateUserInput
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

export default router