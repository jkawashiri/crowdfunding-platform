import { useParams, useNavigate, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import * as campaignsAPI from '../../utilities/campaigns-api'
import * as contributionsAPI from '../../utilities/contributions-api'
import * as commentsAPI from '../../utilities/comments-api'
import * as updatesAPI from '../../utilities/updates-api'
import DeleteConfirmation from "../../components/DeleteConfirmation/DeleteConfirmation"
import AddContributionForm from "../../components/AddContributionForm/AddContributionForm"
import CampaignInfo from "../../components/CampaignInfo/CampaignInfo"
import ProgressBar from "../../components/ProgressBar/ProgressBar"

export default function CampaignPage({user, deleteCampaign}) {
    const [campaign, setCampaign] = useState(null)
    const [deleteClicked, setDeleteClicked] = useState(true)
    const [contributions, setContributions] = useState([])
    const [comments, setComments] = useState([])
    const [updates, setUpdates] = useState([])
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
    const percentageToGoal = Math.round((campaign.moneyRaised / campaign.raiseGoal) * 100)

    const currentDate = new Date()
    const campaignCloseDate = new Date(campaign.closeDate)
    const timeUntilClose = campaignCloseDate.getTime() - currentDate.getTime()
    const daysUntilClose = Math.round(timeUntilClose / (1000 * 3600 * 24)) + 1

    async function handleDeleteCampaign() {
        await deleteCampaign(campaign._id)
        navigate('/')
    }

    function onDeleteClick() {
        setDeleteClicked(deleteClicked => !deleteClicked)
    }

    async function addContribution(campaignId, contribution) {
        const newContribution = await contributionsAPI.createItem(campaignId, contribution)
        setContributions([...contributions, newContribution])

        const updatedCampaign = await campaignsAPI.getById(campaignId)
        setCampaign(updatedCampaign)
    }

    async function addComment(campaignId, comment) {
        const newComment = await commentsAPI.createItem(campaignId, comment)
        setComments([...comments, newComment])

        const updatedCampaign = await campaignsAPI.getById(campaignId)
        setCampaign(updatedCampaign)
    }

    async function deleteComment(campaignId, commentId) {
        await commentsAPI.deleteItem(campaignId, commentId)
        const updatedCampaign = await campaignsAPI.getById(campaignId)
        setCampaign(updatedCampaign)
    }

    async function addUpdate(campaignId, update) {
        const newUpdate = await updatesAPI.createItem(campaignId, update)
        setUpdates([...updates, newUpdate])

        const updatedCampaign = await campaignsAPI.getById(campaignId)
        setCampaign(updatedCampaign)
    }
    return (
        <>
            <h1>{campaign.name}</h1>
            <div>
                <div>{campaign.name} is looking to raise ${campaign.raiseGoal}</div>
                {formattedDate}
                <div>{campaign.name} has raised ${campaign.moneyRaised}</div>
                {campaign.contributions.length} contributions have been made to this campaign!
                <div>{percentageToGoal}% funded</div>
                <ProgressBar bgcolor="#1ed5c3" progress={percentageToGoal > 100 ? 100 : percentageToGoal} height={10} />
                <div>{daysUntilClose <= 0 ? 'Campaign is closed!' : `${daysUntilClose} days to go`}</div>
            </div>
            <button><Link to={`/campaigns/${campaign._id}/edit`}>Edit</Link></button>
            { deleteClicked ?
                <button onClick={onDeleteClick}>Delete</button>
            :
                <DeleteConfirmation handleDeleteCampaign={handleDeleteCampaign} onDeleteClick={onDeleteClick} />
            }
            <AddContributionForm campaignId={campaign._id} addContribution={addContribution} daysUntilClose={daysUntilClose} />
            <CampaignInfo  
                campaign={campaign}
                addComment={addComment} 
                deleteComment={deleteComment}
                addUpdate={addUpdate}
                user={user}
            />
        </>
    )
}