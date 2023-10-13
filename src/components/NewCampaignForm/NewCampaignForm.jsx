import { useState } from "react";
import { useNavigate }  from 'react-router-dom';
import './NewCampaignForm.css'

let date = new Date()
let month = date.getMonth()
let futureMonths = month + 3
let defaultCloseDate = new Date(date)
defaultCloseDate.setMonth(futureMonths)

export default function NewCampaignForm({createCampaign}) {
    const [campaign, setCampaign] = useState({
        name: '',
        description: '',
        raiseGoal: 0,
        closeDate: new Date(defaultCloseDate).toISOString().slice(0, 10)
    })
    const navigate = useNavigate()

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
            closeDate: new Date().toISOString().slice(0, 10)
        })
        navigate('/')
    }
    return (
        <form onSubmit={handleCreateCampaign} className="create-form">
            <div>
                <label>Name:</label>
                <input type="text" name="name" onChange={handleForm} value={campaign.name} className="form-input" />
                <label>Description:</label>
                <textarea name="description" onChange={handleForm} value={campaign.description} className="form-input" />
                <label>Raise Goal:</label>
                <input type="number" name="raiseGoal" onChange={handleForm} value={campaign.raiseGoal} className="form-input" />
                <label>Close Date:</label>
                <input type="date" name="closeDate" onChange={handleForm} value={campaign.closeDate} className="form-input" />
            </div>
            <button type="submit">Create Campaign</button>
        </form>
    )
}