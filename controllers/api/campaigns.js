const Campaign = require('../../models/campaign');

module.exports = {
    index,
    show,
    create,
    update,
    delete: deleteCampaign
}

async function index(req, res,) {
    const campaigns = await Campaign.find()
    res.json(campaigns)
}

async function show(req, res) {
    const campaign = await Campaign.findById(req.params.id)
    res.json(campaign)
}

async function create(req, res) {
    try {
        const {name, description, raiseGoal, closeDate} = req.body
        const userId = req.user._id
        const newCampaign = new Campaign({name, description, raiseGoal, closeDate, user: userId})
        await newCampaign.save()
        res.status(201).json(newCampaign)
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

async function update(req, res) {
    const campaignId = req.params.id
    const updatedCampaignData = req.body
    const updatedCampaign = await Campaign.findByIdAndUpdate(campaignId, updatedCampaignData, {new: true})
    res.json(updatedCampaign)
}

async function deleteCampaign(req, res) {
    await Campaign.findByIdAndRemove(req.params.id)
    res.json({message: "Note deleted successfully"})
}