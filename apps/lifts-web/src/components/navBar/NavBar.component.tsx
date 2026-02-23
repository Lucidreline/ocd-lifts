import { Link } from "react-router-dom"

const NavBar = () => {
    return (
        <div className="nav-bar">
            <span className="nav-link">
                <Link to="/">Dashboard</Link>
            </span>
            <span className="nav-link">
                <Link to="/sessions">Sessions</Link>
            </span>
            <span className="nav-link">
                <Link to="/exercises">Exercises</Link>
            </span>
        </div>
    )
}

export default NavBar