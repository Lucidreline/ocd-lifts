import React, { useEffect, useState } from "react"
import { apiFetch } from "../../utils/api"

interface LoginFormProps {
    onLogin: () => void
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
    const [username, setUsername] = useState("")

    // reads value from my input and puts it into the state
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setUsername(value)
    }

    // hits the login endpoint and triggerss a login if the username was correct
    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await apiFetch('/users/login', {
                method: 'POST',
                body: JSON.stringify({ username }),
            })
            if (response.ok) {
                const { token } = await response.json()
                localStorage.setItem('token', token)
                onLogin()
            }
            else {
                console.log("Login didn't work")
            }
        }
        catch (err) {
            console.error("Error logging in", err)
        }
    }

    return (
        <div className="login-form-container">
            <form onSubmit={handleSubmit} action="">
                <h2>Username</h2>
                <input onChange={handleChange} type="text" name="username" value={username} required />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginForm