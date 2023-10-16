import { useState, useEffect } from "react"
import { MdSearch, MdOutlineClose } from "react-icons/md"
import { Link } from "react-router-dom"
import './SearchBar.css'
import { motion } from "framer-motion"
import { useClickOutside } from "react-click-outside-hook"
import MoonLoader from "react-spinners/MoonLoader"
import SearchResult from "../SearchResult/SearchResult"

export default function SearchBar() {
    const [search, setSearch] = useState('')
    const [results, setResults] = useState([])
    const [clicked, setClicked] = useState(true)
    const [showResults, setShowResults] = useState(false)
    const [recentSearch, setRecentSearch] = useState('')
    const [expanded, setExpanded] = useState(false)
    const [ref, isClickedOutside] = useClickOutside()

    useEffect(function() {
        if(isClickedOutside) {
            collapseContainer()
            setShowResults(false)
        }
    }, [isClickedOutside])

    function expandContainer() {
        setExpanded(true)
        fetchSearchResults(search)
    }

    function collapseContainer() {
        setExpanded(false)
    }

    const containerVariants = {
        expanded: {
            height: "20em",
            width: "100%"
        },
        collapsed: {
            height: "120%",
            width: "100%"
        }
    }

    const containerTransition = {
        type: 'spring',
        damping: 22,
        stiffness: 150
    }

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
            const response = await fetch(`/search?q=${query}`)
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
    return (
        <>
            { clicked ?
                <Link onClick={onClick} className="search-label">Search <MdSearch className="search-icon" /></Link>
            :
                <motion.div 
                    animate={expanded ? "expanded" : "collapsed"} 
                    variants={containerVariants} 
                    transition={containerTransition} 
                    ref={ref}
                    className="search-container"
                >
                    <div className="search-bar">
                        <MdSearch size={20} style={{color:"gray", marginLeft:"10px"}} />
                        <input className="search-input" type="text" placeholder="Search for Campaigns" value={search} onChange={onChange} onFocus={expandContainer} />
                        <Link onClick={() => {onClick(); collapseContainer();}}><MdOutlineClose className="close-icon" /></Link>
                    </div>
                    <div className="spinner-container">
                        { expanded && showResults === false ?
                            <MoonLoader loading color="black" size={20} />
                        :
                            null
                        }
                    </div>
                    <div className="search-results-container">
                        { showResults && ( 
                            results.length > 0 ?
                                <ul className="search-results">
                                    {results.map((campaign, idx) => (
                                        <SearchResult campaign={campaign} key={idx} onClick={onClick} />
                                    ))}
                                </ul>
                            : 
                                <div>No results found for "{recentSearch}"</div>
                        )}
                    </div>
                </motion.div>
            }
        </>
    )
}