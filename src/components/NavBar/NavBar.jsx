import { Link } from "react-router-dom"
import * as userService from '../../utilities/users-service'
import './NavBar.css'
import SearchBar from "../SearchBar/SearchBar"

export default function NavBar({user, setUser}) {
    function handleLogOut() {
        userService.logOut()
        setUser(null)
    }
    return (
        <div>
            <nav className="navbar">
                <div className="navbar-section">
                    <Link to="/">
                        <div className="logo-container">
                            <img src="https://i.imgur.com/g6fWUcj.png" alt="" height="200" width="200" style={{pointerEvents: 'none'}} />
                        </div>
                    </Link>
                    <Link to={user ? "/campaigns/new" : "/auth"}>Create a Campaign</Link>
                </div>
                <div className="navbar-section">
                    <SearchBar />
                    <div className="vertical-line"></div>
                    { user ?
                        <Link to="" onClick={ handleLogOut }>Log Out</Link>
                    :
                        <Link to="/auth">Log In</Link>
                    }
                </div>
            </nav>
            <hr />
        </div>
    )
}