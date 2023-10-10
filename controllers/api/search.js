const Campaign = require('../../models/campaign');

module.exports = {
    index
}

async function index (req, res) {
    const query = req.query.q

    try {
        const campaigns = await Campaign.find({
            name: { $regex: new RegExp(query, 'i') }
        })
        res.json(campaigns)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}