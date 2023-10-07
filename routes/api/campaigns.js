const express = require('express');
const router = express.Router();
const campaignsCtrl = require('../../controllers/api/campaigns');

router.get('/', campaignsCtrl.index)
router.get('/:id', campaignsCtrl.show)
router.post('/', campaignsCtrl.create)
router.put('/:id', campaignsCtrl.update)
router.delete('/:id', campaignsCtrl.delete)

module.exports = router;