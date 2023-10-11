import { Link } from "react-router-dom"

export default function Campaign({campaign}) {
    const [year, month, day] = campaign.closeDate.split('T')[0].split('-')
    const formattedDate = `${month}/${day}/${year}`
    return (
        <>
            <li>
                <Link to={`/campaigns/${campaign._id}`}>
                    {campaign.name}
                    {campaign.description}
                    {campaign.raiseGoal}
                    {formattedDate}
                </Link>
            </li>
        </>
    )
}   