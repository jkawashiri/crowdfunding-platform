import Campaign from "../../components/Campaign/Campaign"
import * as campaignsAPI from '../../utilities/campaigns-api'
import { useState, useEffect } from "react"
import './DiscoverPage.css'
import { Link } from "react-router-dom"
import { MdArrowDropDown } from "react-icons/md"
import { useClickOutside } from "react-click-outside-hook"

export default function DiscoverPage({campaigns, setCampaigns}) {
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [clickedDropdown, setClickedDropdown] = useState(false)
    const [ref, isClickedOutside] = useClickOutside()

    useEffect(function() {
        if(isClickedOutside) {
            setClickedDropdown(false)
        }
    }, [isClickedOutside])

    useEffect(function() {
        async function getCampaigns() {
          const campaigns = await campaignsAPI.getAll()
          setCampaigns(campaigns)
        }
        getCampaigns()
    }, [])

    useEffect(() => {
        window.scrollTo(0,0)
    }, [])

    function handleClickDropdown() {
        setClickedDropdown(clickedDropdown => !clickedDropdown)
    }

    function onAllClick() {
        setSelectedCategory('All')
    }

    function onClosedClick() {
        setSelectedCategory('Closed')
    }

    function onTechClick() {
        setSelectedCategory('Technology')
    }

    function onCreativeClick() {
        setSelectedCategory('Creative')
    }

    function onEcommerceClick() {
        setSelectedCategory('Ecommerce')
    }

    let displayedCampaigns = campaigns;

    switch(selectedCategory) {
        case 'All':
            break
        case 'Closed':
            displayedCampaigns = campaigns.filter((campaign) => new Date(campaign.closeDate) < new Date());
            break
        case 'Technology':
            displayedCampaigns = campaigns.filter(campaign => campaign.category === 'Technology');
            break
        case 'Creative':
            displayedCampaigns = campaigns.filter(campaign => campaign.category === 'Creative');
            break
        case 'Ecommerce':
            displayedCampaigns = campaigns.filter(campaign => campaign.category === 'Ecommerce');
            break
    }
    return (
        <>
            <div className="discover-header">
                <div class="dropdown" ref={ref}> 
                    <button class="dropbtn" onClick={handleClickDropdown}>
                        <div style={{fontSize:"2vmin"}}>{selectedCategory}</div>
                        <MdArrowDropDown 
                            style={{
                                height:"3vmin", 
                                width:"3vmin",
                                transform:`rotate(${clickedDropdown ? 180 : 0}deg)`,
                                transition:"transform 0.3s ease"
                            }} 
                        />
                    </button>
                    { clickedDropdown ?
                        <div class="dropdown-content">
                            <Link onClick={onAllClick} style={{fontSize:"1.8vmin"}}>All Campaigns</Link>
                            <Link onClick={onClosedClick} style={{fontSize:"1.8vmin"}}>Closed Campaigns</Link>
                            <Link onClick={onTechClick} style={{fontSize:"1.8vmin"}}>Technology</Link>
                            <Link onClick={onCreativeClick} style={{fontSize:"1.8vmin"}}>Creative</Link>
                            <Link onClick={onEcommerceClick} style={{fontSize:"1.8vmin", borderBottom:"none"}}>Ecommerce</Link>
                        </div>
                    :
                        null
                    }
                </div>

                <h1>Explore Campaigns</h1>
                <h2>{selectedCategory} Campaigns</h2>
            </div>

            <div className="discover-container">
                { displayedCampaigns.length ?
                    <div className="discover-grid">
                        {displayedCampaigns.map((campaign, idx) => (
                            <Campaign campaign={campaign} key={idx} />
                        ))}
                    </div>
                :
                    <div style={{fontSize:"3vmin"}}>
                        No results found for <span style={{color:"#5271FF", fontWeight:"bold"}}>{selectedCategory}</span> Campaigns
                    </div>
                }
            </div>
        </>
    )
}