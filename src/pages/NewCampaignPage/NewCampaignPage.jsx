import NewCampaignForm from '../../components/NewCampaignForm/NewCampaignForm'
import * as campaignsAPI from '../../utilities/campaigns-api'

export default function NewCampaignPage({campaigns, setCampaigns}) {
    async function createCampaign(campaign) {
        const newCampaign = await campaignsAPI.createItem(campaign)
        setCampaigns([...campaigns, newCampaign])
    }
    return (
        <>
            <h2>Create your new Campaign!</h2>
            <NewCampaignForm createCampaign={createCampaign} />
        </>
    )
}