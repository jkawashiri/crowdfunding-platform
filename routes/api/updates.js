const express = require('express');
const router = express.Router({mergeParams: true});
const updatesCtrl = require('../../controllers/api/updates');

const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.post('/', ensureLoggedIn, updatesCtrl.create)

module.exports = router;