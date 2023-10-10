import Update from "../Update/Update"
import AddUpdateForm from "../AddUpdateForm/AddUpdateForm"
import './CampaignUpdates.css'

export default function CampaignUpdates({addUpdate, updates, campaignId}) {
    return (
        <>
            <h1>Updates</h1>
            { updates.length > 0 ?
                <ul className="updates-list">
                    {updates.map((update, idx) => (
                        <Update update={update} campaignId={campaignId} key={idx} />
                    ))}
                </ul>
            :
                <h3>No Updates Yet!</h3>
            }
            <AddUpdateForm addUpdate={addUpdate} campaignId={campaignId} />
        </>
    )
}