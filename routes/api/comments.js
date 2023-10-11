const express = require('express');
const router = express.Router({mergeParams: true});
const commentsCtrl = require('../../controllers/api/comments');

const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.post('/', ensureLoggedIn, commentsCtrl.create)
router.delete('/:id', ensureLoggedIn, commentsCtrl.delete)

module.exports = router;