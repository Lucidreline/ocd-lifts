import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import type { Session } from "../../interfaces/session"
import { apiFetch } from "../../utils/api"
import SessionsItemList from "../../components/sessionsItemList/SessionsItemList.component"

const SessionsPage = () => {

    const [sessions, setSessions] = useState<Session[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const response = await apiFetch('/sessions')
                if (response.ok) {
                    const data = await response.json()
                    setSessions(data)
                }
            } catch (error) {
                console.error("Error finding your sessions")
            }
        }

        fetchSessions()
    }, [])

    const handleCreateSession = async () => {
        try {
            const response = await apiFetch('/sessions', {
                method: 'POST',
                body: JSON.stringify({ categories: [] }),
            })
            if (response.ok) {
                const newSession = await response.json()
                navigate(`/sessions/${newSession.id}`)
            }
        } catch (error) {
            console.error("Error creating session", error)
        }
    }

    return (
        <div className="sessions-page">
            <div className="page-header">
                <h1>Sessions</h1>
                <button className="create-session-btn" onClick={handleCreateSession}>Create Session</button>
            </div>
            <SessionsItemList sessions={sessions} />
        </div>
    )
}

export default SessionsPage