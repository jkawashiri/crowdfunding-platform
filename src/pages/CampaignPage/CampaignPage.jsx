import { useParams, useNavigate, Link } from "react-router-dom"
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
    const [year, month, day] = campaign.closeDate.split('T')[0].split('-')
    const formattedDate = `${month}/${day}/${year}`

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
            <button><Link to={`/campaigns/${campaign._id}/edit`}>Edit</Link></button>
            { deleteClicked ?
                <button onClick={onDeleteClick}>Delete</button>
            :
                <DeleteConfirmation handleDeleteCampaign={handleDeleteCampaign} onDeleteClick={onDeleteClick} />
            }
        </>
    )
}