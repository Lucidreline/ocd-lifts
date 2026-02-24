import { useEffect, useState } from "react"
import type { Session } from "../../interfaces/session"
import { apiFetch } from "../../utils/api"
import SessionsItemList from "../../components/sessionsItemList/SessionsItemList.component"

const SessionsPage = () => {

    const [sessions, setSessions] = useState<Session[]>([])

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
    })

    return (
        <div className="sessions-page">
            <SessionsItemList sessions={sessions} />
        </div>
    )
}

export default SessionsPage