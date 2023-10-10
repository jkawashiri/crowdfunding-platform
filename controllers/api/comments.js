const Campaign = require('../../models/campaign');

module.exports = {
    create,
    delete: deleteComment
}

async function create(req, res) {
    try {
        const campaign = await Campaign.findById(req.params.id)
        
        campaign.comments.push({
            comment: req.body.comment,
            user: req.user._id,
            userName: req.user.name
        })

        await campaign.save()
        res.status(201).json(campaign)
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

async function deleteComment(req, res) {
    try {
        const campaign = await Campaign.findOne({'comments._id': req.params.id, 'comments.user': req.user._id})

        if (!campaign) {
            return res.status(404).json({message: "Comment not found or user not authorized to delete"})
        }
        
        campaign.comments.remove(req.params.id)
        await campaign.save()

        res.status(200).json({message: "Comment deleted successfully"})
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}