const express = require('express');
const router = express.Router({mergeParams: true});
const contributionsCtrl = require('../../controllers/api/contributions');

router.post('/', contributionsCtrl.create)

module.exports = router;