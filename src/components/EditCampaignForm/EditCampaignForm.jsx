import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EditCampaignForm({campaign, editCampaign}) {
    const [updatedCampaign, setUpdatedCampaign] = useState({
        name: campaign.name,
        description: campaign.description,
        raiseGoal: campaign.raiseGoal,
        closeDate: new Date(campaign.closeDate).toISOString().slice(0, 10)
    })
    const navigate = useNavigate()

    function handleForm(evt) {
        const {name, value} = evt.target
        setUpdatedCampaign(campaign => ({...campaign, [name]: value}))
    }

    async function handleEditCampaign(evt) {
        evt.preventDefault()
        await editCampaign(campaign._id, {
            name: updatedCampaign.name,
            description: updatedCampaign.description,
            raiseGoal: updatedCampaign.raiseGoal,
            closeDate: updatedCampaign.closeDate
        })
        setUpdatedCampaign({
            name: campaign.name,
            description: campaign.description,
            raiseGoal: campaign.raiseGoal,
            closeDate: new Date(campaign.closeDate).toISOString().slice(0, 10)
        })
        navigate(`/campaigns/${campaign._id}`)
    }

    async function handleCancel() {
        setUpdatedCampaign({
            name: campaign.name,
            description: campaign.description,
            raiseGoal: campaign.raiseGoal,
            closeDate: new Date(campaign.closeDate).toISOString().slice(0, 10)
        })
        navigate(`/campaigns/${campaign._id}`)
    }
    return (
        <>
            <form onSubmit={handleEditCampaign}>
                <label>Name: 
                    <input type="text" name="name" onChange={handleForm} value={updatedCampaign.name} />
                </label>
                <label>Description: 
                    <textarea name="description" onChange={handleForm} value={updatedCampaign.description} />
                </label>
                <label>Raise Goal:
                    <input type="number" name="raiseGoal" onChange={handleForm} value={updatedCampaign.raiseGoal} />
                </label>
                <label>Close Date:
                    <input type="date" name="closeDate" onChange={handleForm} value={updatedCampaign.closeDate} />
                </label>
                <button type="submit">Save Campaign</button>
            </form>
            <button onClick={handleCancel}>Cancel</button>
        </>
    )
}