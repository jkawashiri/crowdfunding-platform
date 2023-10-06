import { useState } from "react";

export default function NewCampaignForm({createCampaign}) {
    const [campaign, setCampaign] = useState({
        name: '',
        description: '',
        raiseGoal: 0,
        closeDate: new Date().toISOString().slice(0, 10)
    })

    function handleForm(evt) {
        const value = evt.target.name === 'raiseGoal' ? parseFloat(evt.target.value) : evt.target.value
        setCampaign(campaign => ({...campaign, [evt.target.name]: value}))
    }

    async function handleCreateCampaign(evt) {
        evt.preventDefault()
        await createCampaign({
            name: campaign.name,
            description: campaign.description,
            raiseGoal: campaign.raiseGoal,
            closeDate: campaign.closeDate
        })
        setCampaign({
            name: '',
            description: '',
            raiseGoal: 0,
            closeDate: new Date()
        })
    }
    return (
        <form onSubmit={handleCreateCampaign}>
            <label>Name: 
                <input type="text" name="name" onChange={handleForm} value={campaign.name} />
            </label>
            <label>Description: 
                <textarea type="text" name="description" onChange={handleForm} value={campaign.description} />
            </label>
            <label>Raise Goal:
                <input type="number" name="raiseGoal" onChange={handleForm} value={campaign.raiseGoal} />
            </label>
            <label>Close Date:
                <input type="date" name="closeDate" onChange={handleForm} value={campaign.closeDate} />
            </label>
            <button type="submit">Create Campaign</button>
        </form>
    )
}