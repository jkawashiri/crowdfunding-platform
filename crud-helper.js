// Connect to the database
require('dotenv').config();
require('./config/database');

// Require the Mongoose models
const User = require('./models/user');
const Campaign = require('./models/campaign');

// Local variables will come in handy for holding retrieved documents
let user, campaign;
let users, campaigns;