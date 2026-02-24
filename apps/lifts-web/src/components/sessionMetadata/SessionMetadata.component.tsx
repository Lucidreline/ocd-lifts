import React from "react"
import { apiFetch } from "../../utils/api"
import './SessionMetadata.styles.scss'

interface SessionMetadataProps {
    sessionId: number
    categories: string[]
    onCategoryChange: (categories: string[]) => void
}

const SessionMetadata = ({ sessionId, categories, onCategoryChange }: SessionMetadataProps) => {

    const handleCategoryChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value
        const newCategories = value ? [value] : []
        onCategoryChange(newCategories)

        try {
            await apiFetch(`/sessions/${sessionId}`, {
                method: 'PUT',
                body: JSON.stringify({ categories: newCategories }),
            })
        } catch (error) {
            console.error("Error updating session category", error)
        }
    }

    return (
        <div className="session-metadata">
            <label htmlFor="session-category">Category</label>
            <select
                id="session-category"
                value={categories[0] || ""}
                onChange={handleCategoryChange}
            >
                <option value="">Select a category</option>
                <option value="Upper">Upper</option>
                <option value="Lower">Lower</option>
            </select>
        </div>
    )
}

export default SessionMetadata
