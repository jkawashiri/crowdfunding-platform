const express = require('express');
const router = express.Router({mergeParams: true});
const commentsCtrl = require('../../controllers/api/comments');

router.post('/', commentsCtrl.create)
router.delete('/:id', commentsCtrl.delete)

module.exports = router;