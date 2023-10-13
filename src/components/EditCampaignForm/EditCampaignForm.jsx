import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './EditCampaignForm.css'

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
            <form onSubmit={handleEditCampaign} className="edit-form">
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" onChange={handleForm} value={updatedCampaign.name} className="form-input" />
                    <label>Description:</label>
                    <textarea name="description" onChange={handleForm} value={updatedCampaign.description} className="form-input" />
                    <label>Raise Goal:</label>
                    <input type="number" name="raiseGoal" onChange={handleForm} value={updatedCampaign.raiseGoal} className="form-input" />
                    <label>Close Date:</label>
                    <input type="date" name="closeDate" onChange={handleForm} value={updatedCampaign.closeDate} className="form-input" />
                </div>
                <div>
                    <button type="submit">Save Campaign</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </>
    )
}