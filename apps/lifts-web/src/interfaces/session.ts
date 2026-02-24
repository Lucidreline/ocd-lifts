export interface Session {
    id: number
    categories: string[]
    createdAt: string
    userId: number
    sets: Set[]
}

export interface Set {
    id: number
    createdAt: string
    updatedAt: string
    sessionId: number
    userId: number
    exerciseId: number
    intensity: number
    notes: string
    repCount: number
    weightLbs: number
    score: number
}