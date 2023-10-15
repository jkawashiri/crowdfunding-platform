import Campaign from "../../components/Campaign/Campaign"
import * as campaignsAPI from '../../utilities/campaigns-api';
import { useState, useEffect, useRef } from "react";
import './HomePage.css'
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { Link } from "react-router-dom";

export default function HomePage({campaigns, setCampaigns}) {
    const [centerTrending, setCenterTrending] = useState(false)
    const [centerRecentlyLaunched, setCenterRecentlyLaunched] = useState(false)
    const [centerClosingSoon, setCenterClosingSoon] = useState(false)

    const trendingRef = useRef(null)
    const recentlyLaunchedRef = useRef(null)
    const closingSoonRef = useRef(null)

    useEffect(function() {
        function checkOverflow(ref, setCenterState) {
            if (ref.current && ref.current.scrollWidth <= ref.current.clientWidth) {
                setCenterState(true)
            } else {
                setCenterState(false)
            }
        }

        checkOverflow(trendingRef, setCenterTrending)
        checkOverflow(recentlyLaunchedRef, setCenterRecentlyLaunched)
        checkOverflow(closingSoonRef, setCenterClosingSoon)
    }, [campaigns])

    useEffect(function() {
        async function getCampaigns() {
          const campaigns = await campaignsAPI.getAll()
          setCampaigns(campaigns)
        }
        getCampaigns()
    }, [])

    function slideLeft(sliderRef) {
        const slider = sliderRef.current
        if (slider) {
            slider.scrollLeft -= 500
        }
    }

    function slideRight(sliderRef) {
        const slider = sliderRef.current
        if (slider) {
            slider.scrollLeft += 500
        }
    }

    const recentlyLaunched = campaigns.filter((campaign) => {
        const dateLaunched = new Date(campaign.createdAt)
        const today = new Date()
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(today.getDate() - 30)
        return dateLaunched >= thirtyDaysAgo && dateLaunched <= today
    })

    const closingSoon = campaigns.filter((campaign) => {
        const dateClosed = new Date(campaign.closeDate)
        const today = new Date()
        const thirtyDaysFromNow = new Date()
        thirtyDaysFromNow.setDate(today.getDate() + 30)
        return dateClosed >= today && dateClosed <= thirtyDaysFromNow
    })

    const trendingCampaigns = campaigns.filter((campaign) => {
        const dateLaunched = new Date(campaign.createdAt) 
        const today = new Date()
        const twoWeeksAgo = new Date()
        twoWeeksAgo.setDate(today.getDate() - 14)

        const percentageToGoal = Math.round((campaign.moneyRaised / campaign.raiseGoal) * 100)

        return dateLaunched >= twoWeeksAgo && percentageToGoal >= 30 && new Date(campaign.closeDate) > new Date()
    })

    let totalRaised = 0
    campaigns.forEach((campaign) => {
        totalRaised += campaign.moneyRaised
    })

    let totalContributions = 0
    campaigns.forEach((campaign) => {
        const numberOfContributions = campaign.contributions
        totalContributions += numberOfContributions.length
    })
    return (
        <>
            <div className="home-intro">
                <div style={{fontSize:"28px", marginBottom:"40px"}}>A world powered by people.</div>
                <div style={{color:"gray", fontSize:"1.5vmin"}}>ON JUMPSTARTER:</div>
                <div className="stats-container">
                    <div className="stat-container">
                        <div className="stat">{campaigns.length}</div>
                        <div className="stat-tag">projects funded</div>
                    </div>
                    <div className="stat-container middle-container">
                        <div className="stat">${totalRaised.toLocaleString()}</div>
                        <div className="stat-tag">raised to date</div>
                    </div>
                    <div className="stat-container">
                        <div className="stat">{totalContributions}</div>
                        <div className="stat-tag">contributions</div>
                    </div>
                </div>
            </div>

            <h3 className="category">Trending Campaigns</h3>
            <div className="campaign-list-container">
                <MdChevronLeft className="arrow" onClick={() => slideLeft(trendingRef)} />
                <div ref={trendingRef} className={`campaign-horizontal-scroll ${centerTrending ? 'center-contents' : ''}`}>
                    {trendingCampaigns.map((campaign, idx) => (
                        <Campaign campaign={campaign} key={idx} />
                    ))}
                </div>
                <MdChevronRight className="arrow" onClick={() => slideRight(trendingRef)} />
            </div>

            <h3 className="category">Recently Launched</h3>
            <div className="campaign-list-container">
                <MdChevronLeft className="arrow" onClick={() => slideLeft(recentlyLaunchedRef)} />
                <div ref={recentlyLaunchedRef} className={`campaign-horizontal-scroll ${centerRecentlyLaunched ? 'center-contents' : ''}`}>
                    {recentlyLaunched.map((campaign, idx) => (
                        <Campaign campaign={campaign} key={idx} />
                    ))}
                </div>
                <MdChevronRight className="arrow" onClick={() => slideRight(recentlyLaunchedRef)} />
            </div>

            <h3 className="category">Closing Soon</h3>
            <div className="campaign-list-container">
                <MdChevronLeft className="arrow" onClick={() => slideLeft(closingSoonRef)} />
                <div ref={closingSoonRef} className={`campaign-horizontal-scroll ${centerClosingSoon ? 'center-contents' : ''}`}>
                    {closingSoon.map((campaign, idx) => (
                        <Campaign campaign={campaign} key={idx} />
                    ))}
                </div>
                <MdChevronRight className="arrow" onClick={() => slideRight(closingSoonRef)} />
            </div>

            <Link to="/discover"><button>Explore More Campaigns</button></Link>
        </>
    )
}