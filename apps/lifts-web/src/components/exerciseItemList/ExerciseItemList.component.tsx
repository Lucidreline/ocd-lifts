import ExerciseItem from "../exerciseItem/ExerciseItem.component"
import type { Exercise } from "../../interfaces/exercise"

interface ExerciseItemListProps {
    exercises: Exercise[]
}

const ExerciseItemList = ({ exercises }: ExerciseItemListProps) => {
    return (
        <div className="exercise-item-list">
            {exercises.map(exercise => (
                <ExerciseItem exercise={exercise} key={exercise.id} />
            ))}
        </div>
    )
}

export default ExerciseItemList