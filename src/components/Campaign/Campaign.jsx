import { Link } from "react-router-dom"
import './Campaign.css'

export default function Campaign({campaign}) {
    const [year, month, day] = campaign.closeDate.split('T')[0].split('-')
    const formattedDate = `${month}/${day}/${year}`
    return (
        <>
            <Link to={`/campaigns/${campaign._id}`} className="campaign-container">
                <div>{campaign.name}</div>
                <div>{campaign.description}</div>
                <div>{campaign.raiseGoal}</div>
                <div>{formattedDate}</div>
            </Link>
        </>
    )
}   