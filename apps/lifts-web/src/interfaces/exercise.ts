export interface Exercise {
    id: number
    name: string
    variation?: string
    repRange?: string
    userId: number
    categories: string[]
    isArchived: boolean
    muscleGroups: MuscleGroup[]
}

export interface MuscleGroup {
    id: number
    priority: number
    vagueName: string
    specificName: string
    exerciseId: number
}
