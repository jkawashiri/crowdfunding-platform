const Campaign = require('../../models/campaign');

module.exports = {
    create
}

async function create(req, res) {
    try {
        const campaign = await Campaign.findById(req.params.id)
        
        campaign.contributions.push({
            amount: req.body.amount,
            user: req.user._id
        })

        campaign.moneyRaised += req.body.amount

        await campaign.save()
        res.status(201).json(campaign)
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}