const express = require('express');
const router = express.Router();
const campaignsCtrl = require('../../controllers/api/campaigns');

const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.get('/', campaignsCtrl.index)
router.get('/:id', campaignsCtrl.show)
router.post('/', ensureLoggedIn, campaignsCtrl.create)
router.put('/:id', ensureLoggedIn, campaignsCtrl.update)
router.delete('/:id', ensureLoggedIn, campaignsCtrl.delete)

module.exports = router;