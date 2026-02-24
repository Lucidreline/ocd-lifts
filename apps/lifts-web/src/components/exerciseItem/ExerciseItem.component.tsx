import type { Exercise } from "../../interfaces/exercise"
import './ExerciseItem.styles.scss'

interface ExerciseItemProps {
    exercise: Exercise
}

const ExerciseItem = ({ exercise }: ExerciseItemProps) => {
    const { name, categories } = exercise
    return (
        <div className="exercise-item">
            <div className="exercise-item-left">
                <h4 className="exercise-name">{name}</h4>
                <span className="exercise-categories">{categories.join(", ")}</span>
            </div>
            <div className="exercise-item-right">
                <div className="exercise-item-buttons">
                    <button className="edit-exercise">Edit</button>
                    <button className="delete-exercise">Delete</button>
                </div>
            </div>

        </div>
    )
}

export default ExerciseItem