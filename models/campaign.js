const mongoose = require('mongoose')
const Schema = mongoose.Schema

const campaignSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    raiseGoal: {type: Number, required: true},
    closeDate: {type: Date, required: true},
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Campaign', campaignSchema)