import type { Session } from '../../interfaces/session'
import SessionsItem from '../sessionsItem/SessionsItem.component'

interface SessionsItemListProps {
    sessions: Session[]
}

const SessionsItemList = ({ sessions }: SessionsItemListProps) => {
    return (
        <div className="sessions-item-list">
            {sessions.map(session => (
                <SessionsItem key={session.id} session={session} />
            ))}
        </div>
    )
}

export default SessionsItemList