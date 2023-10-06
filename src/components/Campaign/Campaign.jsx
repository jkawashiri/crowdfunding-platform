export default function Campaign({campaign}) {
    const formattedDate = new Date(campaign.closeDate).toLocaleDateString()
    return (
        <>
            {campaign.name}
            {campaign.description}
            {campaign.raiseGoal}
            {formattedDate}
        </>
    )
}   