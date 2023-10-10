import { Link } from "react-router-dom"
import * as userService from '../../utilities/users-service'
import { useState } from "react"
import { MdSearch, MdOutlineCancel } from "react-icons/md"

export default function NavBar({user, setUser}) {
    const [search, setSearch] = useState('')
    const [results, setResults] = useState([])
    const [clicked, setClicked] = useState(true)
    const [showResults, setShowResults] = useState(false)
    const [recentSearch, setRecentSearch] = useState('')

    function onClick() {
        setClicked(clicked => !clicked)
        if (!clicked) {
            setSearch('')
            setResults([])
            setShowResults(false)
        }
    }

    function onChange(evt) {
        const value = evt.target.value
        setSearch(value)

        if (value.length > 2) {
            fetchSearchResults(value)
        } else {
            setResults([])
            setShowResults(false)
        }
    }

    async function fetchSearchResults(query) {
        if (!query || query.trim() === '') return
        try {
            const response = await fetch(`http://localhost:3001/search?q=${query}`)
            const data = await response.json()
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            setResults(data)
            setShowResults(true)
            setRecentSearch(query)
        } catch (err) {
            console.error("Error fetching search results:", err)
        }
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
                    <button onClick={() => fetchSearchResults(search)}>Search</button>
                    <Link onClick={onClick}><MdOutlineCancel /></Link>
                    { showResults && ( 
                        results.length > 0 ?
                            <ul>
                                {results.map((campaign, idx) => (
                                    <Link to={`/campaigns/${campaign._id}`} key={idx}>{campaign.name}</Link>
                                ))}
                            </ul>
                        : 
                            <div>No results found for "{recentSearch}"</div>
                    )}
                </>
            }
        </nav>
    )
}