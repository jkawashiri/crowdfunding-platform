import { Link } from "react-router-dom"

export default function Campaign({campaign}) {
    const formattedDate = new Date(campaign.closeDate).toLocaleDateString()
    return (
        <>
            <Link to={`/campaigns/${campaign._id}`}>
                {campaign.name}
                {campaign.description}
                {campaign.raiseGoal}
                {formattedDate}
            </Link>
        </>
    )
}   