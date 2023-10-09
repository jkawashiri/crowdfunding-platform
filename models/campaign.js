const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    comment: {type: String, required: true},
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userName: String
}, {
    timestamps: true
})

const contributionSchema = new Schema({
    amount: {type: Number, required: true},
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
})

const campaignSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    raiseGoal: {type: Number, required: true},
    closeDate: {type: Date, required: true},
    moneyRaised: {type: Number, required: true, default: 0},
    contributions: {type: [contributionSchema]},
    comments: {type: [commentSchema]},
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Campaign', campaignSchema)