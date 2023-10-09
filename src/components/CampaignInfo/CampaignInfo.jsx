import { Link, Routes, Route } from "react-router-dom"
import CampaignDescription from "../CampaignDescription/CampaignDescription"
import CampaignUpdates from "../CampaignUpdates/CampaignUpdates"
import CampaignComments from "../CampaignComments/CampaignComments"

export default function CampaignInfo({description, addComment, comments, campaignId}) {
    return (
        <>
            <nav>
                <Link to={`description`}>Description</Link>
                &nbsp;&nbsp;<Link to={`updates`}>Updates</Link>
                &nbsp;&nbsp;<Link to={`comments`}>Comments</Link>
            </nav>
            <Routes>
                <Route path="/" element={<CampaignDescription description={description} />} index />
                <Route path="description" element={<CampaignDescription description={description} />} />
                <Route path="updates" element={<CampaignUpdates />} />
                <Route path="comments" element={<CampaignComments addComment={addComment} comments={comments} campaignId={campaignId} />} />
            </Routes>
        </>
    )
}