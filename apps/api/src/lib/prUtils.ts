import { prisma } from './prisma.js'
import { prInput } from '../types/workout.types.js'

export const isPr = async (body: prInput) => {
    const exercisePrs = await prisma.pR.findMany({
        where: { exerciseId: body.exerciseId }
    })

    if (exercisePrs.length === 0) return true

    const bestScore = Math.max(...exercisePrs.map(pr => pr.score))
    return body.score > bestScore
}

export const createPr = async (body: prInput) => {
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