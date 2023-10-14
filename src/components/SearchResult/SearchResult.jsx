import { Link } from "react-router-dom"
import './SearchResult.css'
import { motion } from "framer-motion"

export default function SearchResult({campaign, onClick}) {
    const percentageToGoal = Math.round((campaign.moneyRaised / campaign.raiseGoal) * 100)
    const formattedRaiseGoal = campaign.raiseGoal.toLocaleString()
    return (
        <motion.div 
            className="search-result-container"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
            <Link to={`/campaigns/${campaign._id}`} className="campaign-name" onClick={onClick}>{campaign.name}</Link>
            <div className="campaign-percent">{percentageToGoal}% funded</div>
            <div className="campaign-goal">${formattedRaiseGoal} raised</div>
        </motion.div>
    )
}