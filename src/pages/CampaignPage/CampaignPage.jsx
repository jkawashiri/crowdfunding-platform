import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import * as campaignsAPI from '../../utilities/campaigns-api'
import DeleteConfirmation from "../../components/DeleteConfirmation/DeleteConfirmation"

export default function CampaignPage({deleteCampaign}) {
    const [campaign, setCampaign] = useState(null)
    const [deleteClicked, setDeleteClicked] = useState(true)
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(function() {
        async function getCampaign() {
          const campaignData = await campaignsAPI.getById(id)
          setCampaign(campaignData)
        }
        getCampaign()
    }, [id])
    if (!campaign) return 
    const formattedDate = new Date(campaign.closeDate).toLocaleDateString()

    async function handleDeleteCampaign() {
        await deleteCampaign(campaign._id)
        navigate('/')
    }

    function onDeleteClick() {
        setDeleteClicked(deleteClicked => !deleteClicked)
    }
    return (
        <>
            <h1>{campaign.name}</h1>
            <div>
                {campaign.description}
                {campaign.raiseGoal}
                {formattedDate}
            </div>
            <button>Edit</button>
            { deleteClicked ?
                <button onClick={onDeleteClick}>Delete</button>
            :
                <DeleteConfirmation handleDeleteCampaign={handleDeleteCampaign} onDeleteClick={onDeleteClick} />
            }
        </>
    )
}