import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { apiFetch } from "../../utils/api"
import type { Session } from "../../interfaces/session"
import type { Set } from "../../interfaces/session"
import SessionMetadata from "../../components/sessionMetadata/SessionMetadata.component"
import NewSetForm from "../../components/newSetForm/NewSetForm.component"
import SetItemList from "../../components/setItemList/SetItemList.component"
import './Session.styles.scss'

const SessionPage = () => {
    const { sessionId } = useParams()
    const [session, setSession] = useState<Session | null>(null)

    // fetch session data
    useEffect(() => {
        const fetchSession = async () => {
            try {
                const response = await apiFetch(`/sessions/${sessionId}`)
                if (response.ok) {
                    const data = await response.json()
                    setSession(data)
                }
            } catch (error) {
                console.error("Error fetching session", error)
            }
        }
        fetchSession()
    }, [sessionId])

    const handleCategoryChange = (categories: string[]) => {
        if (session) {
            setSession({ ...session, categories })
        }
    }

    const handleSetAdded = (newSet: Set) => {
        if (session) {
            setSession({ ...session, sets: [...session.sets, newSet] })
        }
    }

    if (!session) {
        return <div>Loading...</div>
    }

    return (
        <div className="session-page">
            <SessionMetadata
                sessionId={session.id}
                categories={session.categories}
                onCategoryChange={handleCategoryChange}
            />
            <NewSetForm
                sessionId={session.id}
                sessionCategories={session.categories}
                onSetAdded={handleSetAdded}
            />
            <SetItemList sets={session.sets} />
        </div>
    )
}

export default SessionPage
