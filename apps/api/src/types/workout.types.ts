export interface prInput {
    userId: number
    sessionId: number
    exerciseId: number
    setId: number
    score: number
    weightLbs: number
    repCount: number
}

export interface SessionInput {
    categories: string[]
}

export interface setInput {
    exerciseId: number,
    intensity: number,
    notes: string,
    repCount: number,
    weightLbs: number
} 