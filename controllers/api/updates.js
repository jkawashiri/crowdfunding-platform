const Campaign = require('../../models/campaign');

module.exports = {
    create
}

async function create(req, res) {
    try {
        const campaign = await Campaign.findById(req.params.id)
        
        campaign.updates.push({
            update: req.body.update,
            user: req.user._id
        })

        await campaign.save()
        res.status(201).json(campaign)
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}