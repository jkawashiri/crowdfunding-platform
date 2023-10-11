const express = require('express');
const router = express.Router({mergeParams: true});
const contributionsCtrl = require('../../controllers/api/contributions');

const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.post('/', ensureLoggedIn, contributionsCtrl.create)

module.exports = router;