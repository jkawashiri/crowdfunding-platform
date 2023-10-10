import { Link } from "react-router-dom"
import * as userService from '../../utilities/users-service'
import { useState } from "react"
import { MdSearch, MdOutlineCancel } from "react-icons/md"

export default function NavBar({user, setUser}) {
    const [search, setSearch] = useState('')
    const [results, setResults] = useState([])
    const [clicked, setClicked] = useState(true)

    function onClick() {
        setClicked(clicked => !clicked)
        setSearch('')
        setResults([])
    }

    function onChange(evt) {
        setSearch(evt.target.value)
    }

    async function onSearch() {
        try {
            const response = await fetch(`http://localhost:3001/search?q=${search}`);
            const data = await response.json();
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            setResults(data);
        } catch (err) {
            console.error("Error fetching search results:", err);
        }
        setSearch('')
    }

    function handleLogOut() {
        userService.logOut()
        setUser(null)
    }
    return (
        <nav>
            <Link to="/">Home</Link>
            &nbsp;&nbsp;<Link to="/campaigns/new">Create a Campaign</Link>
            &nbsp;&nbsp;<span>Welcome, {user.name}</span>
            &nbsp;&nbsp;<Link to="" onClick={ handleLogOut }>Log Out</Link>
            &nbsp;&nbsp;
            { clicked ?
                <Link onClick={onClick}>Search <MdSearch /></Link>
            :
                <>
                    <input type="text" placeholder="Search for Campaigns" value={search} onChange={onChange} />
                    <button onClick={onSearch}>Search</button>
                    <Link onClick={onClick}><MdOutlineCancel /></Link>
                </>
            }
            <ul>
                {results.map(campaign => (
                    <li key={campaign._id}>{campaign.name}</li>
                ))}
            </ul>
        </nav>
    )
}