const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/crowdfunding-platform', { useNewUrlParser: true, useUnifiedTopology: true });
const Schema = mongoose.Schema;

const searchSchema = new Schema({
    item: String
})

module.exports = mongoose.model('Search', searchSchema)