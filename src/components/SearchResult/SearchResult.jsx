import { Link } from "react-router-dom"
import './SearchResult.css'

export default function SearchResult({campaign}) {
    const percentageToGoal = Math.round((campaign.moneyRaised / campaign.raiseGoal) * 100)
    const formattedRaiseGoal = campaign.raiseGoal.toLocaleString()
    return (
        <div className="search-result-container">
            <Link to={`/campaigns/${campaign._id}`} className="campaign-name">{campaign.name}</Link>
            <div className="campaign-percent">{percentageToGoal}% funded</div>
            <div className="campaign-goal">${formattedRaiseGoal} raised</div>
        </div>
    )
}