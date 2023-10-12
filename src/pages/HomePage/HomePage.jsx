import Campaign from "../../components/Campaign/Campaign"
import * as campaignsAPI from '../../utilities/campaigns-api';
import { useEffect, useRef } from "react";
import './HomePage.css'
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

export default function HomePage({campaigns, setCampaigns}) {
    useEffect(function() {
        async function getCampaigns() {
          const campaigns = await campaignsAPI.getAll()
          setCampaigns(campaigns)
        }
        getCampaigns()
    }, [])

    const trendingRef = useRef(null)
    const recentlyLaunchedRef = useRef(null)
    const closingSoonRef = useRef(null)
    const closedCampaignsRef = useRef(null)
    const allCampaignRef = useRef(null)

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

    const closedCampaigns = campaigns.filter((campaign) => new Date(campaign.closeDate) < new Date())

    const trendingCampaigns = campaigns.filter((campaign) => {
        const dateLaunched = new Date(campaign.createdAt) 
        const today = new Date()
        const twoWeeksAgo = new Date()
        twoWeeksAgo.setDate(today.getDate() - 14)

        const percentageToGoal = Math.round((campaign.moneyRaised / campaign.raiseGoal) * 100)

        return dateLaunched >= twoWeeksAgo && percentageToGoal >= 30 && new Date(campaign.closeDate) > new Date()
    })
    return (
        <>
            <h3>Trending Campaigns</h3>
            <div className="campaign-list-container">
                <MdChevronLeft className="arrow" onClick={() => slideLeft(trendingRef)} />
                <div ref={trendingRef} className="campaign-horizontal-scroll">
                    {trendingCampaigns.map((campaign, idx) => (
                        <Campaign campaign={campaign} key={idx} />
                    ))}
                </div>
                <MdChevronRight className="arrow" onClick={() => slideRight(trendingRef)} />
            </div>

            <h3>Recently Launched</h3>
            <div className="campaign-list-container">
                <MdChevronLeft className="arrow" onClick={() => slideLeft(recentlyLaunchedRef)} />
                <div ref={recentlyLaunchedRef} className="campaign-horizontal-scroll">
                    {recentlyLaunched.map((campaign, idx) => (
                        <Campaign campaign={campaign} key={idx} />
                    ))}
                </div>
                <MdChevronRight className="arrow" onClick={() => slideRight(recentlyLaunchedRef)} />
            </div>

            <h3>Closing Soon</h3>
            <div className="campaign-list-container">
                <MdChevronLeft className="arrow" onClick={() => slideLeft(closingSoonRef)} />
                <div ref={closingSoonRef} className="campaign-horizontal-scroll">
                    {closingSoon.map((campaign, idx) => (
                        <Campaign campaign={campaign} key={idx} />
                    ))}
                </div>
                <MdChevronRight className="arrow" onClick={() => slideRight(closingSoonRef)} />
            </div>

            <h3>Closed Campaigns</h3>
            <div className="campaign-list-container">
                <MdChevronLeft className="arrow" onClick={() => slideLeft(closedCampaignsRef)} />
                <div ref={closedCampaignsRef} className="campaign-horizontal-scroll">
                    {closedCampaigns.map((campaign, idx) => (
                        <Campaign campaign={campaign} key={idx} />
                    ))}
                </div>
                <MdChevronRight className="arrow" onClick={() => slideRight(closedCampaignsRef)} />
            </div>

            <h3>All Campaigns</h3>
            <div className="campaign-list-container">
                <MdChevronLeft className="arrow" onClick={() => slideLeft(allCampaignRef)} />
                <div ref={allCampaignRef} className="campaign-horizontal-scroll">
                    {campaigns.map((campaign, idx) => (
                        <Campaign campaign={campaign} key={idx} />
                    ))}
                </div>
                <MdChevronRight className="arrow" onClick={() => slideRight(allCampaignRef)} />
            </div>
        </>
    )
}