import { useParams, useNavigate, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import * as campaignsAPI from '../../utilities/campaigns-api'
import * as contributionsAPI from '../../utilities/contributions-api'
import * as commentsAPI from '../../utilities/comments-api'
import DeleteConfirmation from "../../components/DeleteConfirmation/DeleteConfirmation"
import AddContributionForm from "../../components/AddContributionForm/AddContributionForm"
import CampaignInfo from "../../components/CampaignInfo/CampaignInfo"

export default function CampaignPage({deleteCampaign}) {
    const [campaign, setCampaign] = useState(null)
    const [deleteClicked, setDeleteClicked] = useState(true)
    const [contributions, setContributions] = useState([])
    const [comments, setComments] = useState([])
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
    return (
        <>
            <h1>{campaign.name}</h1>
            <div>
                <div>{campaign.name} is looking to raise ${campaign.raiseGoal}</div>
                {formattedDate}
                <div>{campaign.name} has raised ${campaign.moneyRaised}</div>
                {campaign.contributions.length} contributions have been made to this campaign!
            </div>
            <button><Link to={`/campaigns/${campaign._id}/edit`}>Edit</Link></button>
            { deleteClicked ?
                <button onClick={onDeleteClick}>Delete</button>
            :
                <DeleteConfirmation handleDeleteCampaign={handleDeleteCampaign} onDeleteClick={onDeleteClick} />
            }
            <AddContributionForm campaignId={campaign._id} addContribution={addContribution} />
            <CampaignInfo campaignId={campaign._id} description={campaign.description} addComment={addComment} comments={campaign.comments} />
        </>
    )
}