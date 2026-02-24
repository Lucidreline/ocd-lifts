import React, { useEffect, useState } from "react"
import { apiFetch } from "../../utils/api"
import type { Exercise } from "../../interfaces/exercise"
import type { Set } from "../../interfaces/session"
import './NewSetForm.styles.scss'

interface NewSetFormProps {
    sessionId: number
    sessionCategories: string[]
    onSetAdded: (newSet: Set) => void
}

const NewSetForm = ({ sessionId, sessionCategories, onSetAdded }: NewSetFormProps) => {
    const [exercises, setExercises] = useState<Exercise[]>([])
    const [exerciseId, setExerciseId] = useState<number | "">("")
    const [weightLbs, setWeightLbs] = useState<number | "">("")
    const [repCount, setRepCount] = useState<number | "">("")
    const [intensity, setIntensity] = useState<number | "">("")
    const [notes, setNotes] = useState("")
    const [rememberExercise, setRememberExercise] = useState(false)
    const [rememberWeight, setRememberWeight] = useState(false)

    // fetch all exercises
    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const response = await apiFetch('/exercises')
                if (response.ok) {
                    const data = await response.json()
                    setExercises(data)
                }
            } catch (error) {
                console.error("Error fetching exercises", error)
            }
        }
        fetchExercises()
    }, [])

    // filter exercises by session category and sort alphabetically
    const filteredExercises = exercises
        .filter(exercise =>
            sessionCategories.length > 0 &&
            exercise.categories.some(cat => sessionCategories.includes(cat))
        )
        .sort((a, b) => a.name.localeCompare(b.name))

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const response = await apiFetch(`/sessions/${sessionId}/sets`, {
                method: 'POST',
                body: JSON.stringify({
                    exerciseId,
                    weightLbs,
                    repCount,
                    intensity,
                    notes,
                }),
            })
            if (response.ok) {
                const newSet = await response.json()
                onSetAdded(newSet)

                // clear form, respecting "remember" checkboxes
                if (!rememberExercise) setExerciseId("")
                if (!rememberWeight) setWeightLbs("")
                setRepCount("")
                setIntensity("")
                setNotes("")
            }
        } catch (error) {
            console.error("Error creating set", error)
        }
    }

    return (
        <div className="new-set-form-container">
            <h3>Add Set</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-field">
                    <label htmlFor="exercise-select">Exercise</label>
                    <select
                        id="exercise-select"
                        value={exerciseId}
                        onChange={e => setExerciseId(e.target.value ? Number(e.target.value) : "")}
                        required
                    >
                        <option value="">
                            {sessionCategories.length === 0
                                ? "Select a session category first"
                                : "Select an exercise"}
                        </option>
                        {filteredExercises.map(exercise => (
                            <option key={exercise.id} value={exercise.id}>
                                {exercise.name}{exercise.variation ? ` (${exercise.variation})` : ""}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-field">
                    <label htmlFor="weight">Weight (lbs)</label>
                    <input
                        id="weight"
                        type="number"
                        value={weightLbs}
                        onChange={e => setWeightLbs(e.target.value ? Number(e.target.value) : "")}
                        required
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="reps">Reps</label>
                    <input
                        id="reps"
                        type="number"
                        value={repCount}
                        onChange={e => setRepCount(e.target.value ? Number(e.target.value) : "")}
                        required
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="intensity">Intensity (RPE)</label>
                    <input
                        id="intensity"
                        type="number"
                        step="0.01"
                        min="0"
                        max="10"
                        value={intensity}
                        onChange={e => setIntensity(e.target.value ? Number(e.target.value) : "")}
                        required
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="notes">Notes</label>
                    <input
                        id="notes"
                        type="text"
                        value={notes}
                        onChange={e => setNotes(e.target.value)}
                    />
                </div>

                <div className="form-checkboxes">
                    <label>
                        <input
                            type="checkbox"
                            checked={rememberExercise}
                            onChange={e => setRememberExercise(e.target.checked)}
                        />
                        Remember exercise
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={rememberWeight}
                            onChange={e => setRememberWeight(e.target.checked)}
                        />
                        Remember weight
                    </label>
                </div>

                <button type="submit">Add Set</button>
            </form>
        </div>
    )
}

export default NewSetForm
