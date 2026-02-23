import React, { useEffect, useState } from "react"

const LoginForm = () => {
    const [username, setUsername] = useState("")

    // fetch
    // useEffect(() => {
    //     fetch('http://localhost:3000/users/login')
    //         .then(res => res.json())
    //         .then(data => setUsername(data))
    // })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setUsername(value)
    }

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const response = await fetch('http://localhost:3000/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username }),
            })
            if (response.ok) {
                const { token } = await response.json()
                localStorage.setItem('token', token)
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