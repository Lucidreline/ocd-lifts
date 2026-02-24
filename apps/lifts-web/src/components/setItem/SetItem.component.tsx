import type { Set } from "../../interfaces/session"
import './SetItem.styles.scss'

interface SetItemProps {
    set: Set
}

const SetItem = ({ set }: SetItemProps) => {
    const { weightLbs, repCount, intensity, notes } = set

    return (
        <div className="set-item">
            <span className="set-weight">{weightLbs} lbs</span>
            <span className="set-reps">{repCount} reps</span>
            <span className="set-intensity">RPE {intensity}</span>
            {notes && <span className="set-notes">{notes}</span>}
        </div>
    )
}

export default SetItem
