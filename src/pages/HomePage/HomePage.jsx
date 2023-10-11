import Campaign from "../../components/Campaign/Campaign"
import * as campaignsAPI from '../../utilities/campaigns-api';
import { useEffect } from "react";

export default function HomePage({campaigns, setCampaigns}) {
    useEffect(function() {
        async function getCampaigns() {
          const campaigns = await campaignsAPI.getAll()
          setCampaigns(campaigns)
        }
        getCampaigns()
    }, [])

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
            <ul>
                {trendingCampaigns.map((campaign, idx) => (
                    <Campaign campaign={campaign} key={idx} />
                ))}
            </ul>

            <h3>Recently Launched</h3>
            <ul>
                {recentlyLaunched.map((campaign, idx) => (
                    <Campaign campaign={campaign} key={idx} />
                ))}
            </ul>

            <h3>Closing Soon</h3>
            <ul>
                {closingSoon.map((campaign, idx) => (
                    <Campaign campaign={campaign} key={idx} />
                ))}
            </ul>

            <h3>Closed Campaigns</h3>
            <ul>
                {closedCampaigns.map((campaign, idx) => (
                    <Campaign campaign={campaign} key={idx} />
                ))}
            </ul>

            <h3>All Campaigns</h3>
            <ul>
                {campaigns.map((campaign, idx) => (
                    <Campaign campaign={campaign} key={idx} />
                ))}
            </ul>
        </>
    )
}