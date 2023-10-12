import { Link } from "react-router-dom"
import './Campaign.css'

export default function Campaign({campaign}) {
    const percentageToGoal = Math.round((campaign.moneyRaised / campaign.raiseGoal) * 100)
    const formattedRaiseGoal = campaign.raiseGoal.toLocaleString()
    return (
        <div className="campaign-container">
            <Link to={`/campaigns/${campaign._id}`} >
                <div className="campaign-name">{campaign.name}</div>
            </Link>
            <div className="campaign-percent">{percentageToGoal}% funded</div>
            <div className="campaign-goal">${formattedRaiseGoal} raised</div>
        </div>
    )
}   