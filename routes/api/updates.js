const express = require('express');
const router = express.Router({mergeParams: true});
const updatesCtrl = require('../../controllers/api/updates');

router.post('/', updatesCtrl.create)

module.exports = router;