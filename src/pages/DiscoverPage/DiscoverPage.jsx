import Campaign from "../../components/Campaign/Campaign"
import * as campaignsAPI from '../../utilities/campaigns-api'
import { useState, useEffect } from "react"
import './DiscoverPage.css'
import { Link } from "react-router-dom"

export default function DiscoverPage({campaigns, setCampaigns}) {
    const [selectedCategory, setSelectedCategory] = useState('All')

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
                <div class="dropdown"> 
                    <button class="dropbtn">
                        <span>Categories</span>
                    </button>
                    <div class="dropdown-content">
                        <Link onClick={onAllClick}>All Campaigns</Link>
                        <Link onClick={onClosedClick}>Closed Campaigns</Link>
                        <Link onClick={onTechClick}>Technology</Link>
                        <Link onClick={onCreativeClick}>Creative</Link>
                        <Link onClick={onEcommerceClick}>Ecommerce</Link>
                    </div>
                </div>

                <h1>Explore Campaigns</h1>
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
                        No results found for <span style={{color:"#5271FF", fontWeight:"bold"}}>{selectedCategory}</span>
                    </div>
                }
            </div>
        </>
    )
}