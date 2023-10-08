import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import EditCampaignForm from '../../components/EditCampaignForm/EditCampaignForm'
import * as campaignsAPI from '../../utilities/campaigns-api'

export default function EditCampaignPage({editCampaign}) {
    const {id} = useParams()
    const [campaign, setCampaign] = useState(null)

    useEffect(function() {
        async function getCampaign() {
          const campaignData = await campaignsAPI.getById(id)
          setCampaign(campaignData)
        }
        getCampaign()
    }, [id])
    if (!campaign) return 
    return (
        <EditCampaignForm campaign={campaign} editCampaign={editCampaign} />
    )
}