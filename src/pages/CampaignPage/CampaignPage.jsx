import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import * as campaignsAPI from '../../utilities/campaigns-api'

export default function CampaignPage() {
    const [campaign, setCampaign] = useState(null)
    const {id} = useParams()

    useEffect(function() {
        async function getCampaign() {
          const campaignData = await campaignsAPI.getById(id)
          setCampaign(campaignData)
        }
        getCampaign()
    }, [id])

    if (!campaign) return 

    const formattedDate = new Date(campaign.closeDate).toLocaleDateString()
    return (
        <>
            <h1>Campaign Page</h1>
            {campaign.name}
            {campaign.description}
            {campaign.raiseGoal}
            {formattedDate}
        </>
    )
}