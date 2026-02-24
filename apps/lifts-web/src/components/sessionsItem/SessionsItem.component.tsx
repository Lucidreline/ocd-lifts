import type { Session } from '../../interfaces/session'

interface SessionsItemProps {
    session: Session
}

const SessionsItem = ({ session }: SessionsItemProps) => {

    const formatDate = (dateString) => {
        if (!dateString) return "";
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            timeZone: 'America/Los_Angeles'
        }).format(new Date(dateString));
    };

    const { createdAt, categories } = session
    return (
        <div className="sessions-item">
            <div className="sessions-item-left">
                <h4 className="session-name">{formatDate(createdAt)} - {categories.join(', ')}</h4>
            </div>
            <div className="sessions-item-right">
                <div className="sessions-item-buttons">
                    <button className="view-session">View</button>
                    <button className="delete-session">Delete</button>
                </div>
            </div>
        </div>
    )
}

export default SessionsItem