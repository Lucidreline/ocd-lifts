import { useEffect, useState } from "react"
import './Exercises.styles.scss'
import ExerciseItemList from "../../components/exerciseItemList/ExerciseItemList.component"
import { apiFetch } from "../../utils/api"
import type { Exercise } from "../../interfaces/exercise"

const ExercisePage = () => {
    const [exercises, setExercises] = useState<Exercise[]>([])

    // fetch exercise data
    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const response = await apiFetch('/exercises')
                if (response.ok) {
                    const data = await response.json()
                    setExercises(data)
                }
            } catch (error) {
                console.error("Error finding your exercises")
            }
        }
        fetchExercises()
    }, [])

    return (
        <div className="exercise-page">
            <div className="page-header">
                <h1>Exercises</h1>
                <button className="add-exercise-btn">Add Exercise</button>
            </div>
            <ExerciseItemList exercises={exercises} />
        </div>
    )
}

export default ExercisePage