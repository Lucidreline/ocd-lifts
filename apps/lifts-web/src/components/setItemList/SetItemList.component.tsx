import SetItem from "../setItem/SetItem.component"
import type { Set } from "../../interfaces/session"
import './SetItemList.styles.scss'

interface SetItemListProps {
    sets: Set[]
}

const SetItemList = ({ sets }: SetItemListProps) => {
    return (
        <div className="set-item-list">
            {sets.map(set => (
                <SetItem set={set} key={set.id} />
            ))}
        </div>
    )
}

export default SetItemList
