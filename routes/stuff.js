const express = require('express');
const router = express.Router();
const Thing = require('../models/Thing');
const stuffCtrl = require('../controllers/stuff');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, stuffCtrl.createThing);
router.get('/', auth, stuffCtrl.readAllThing);
router.get('/:id', auth, stuffCtrl.readOneThing);
router.put('/:id', auth, multer, stuffCtrl.updateThing);
router.delete('/:id', auth, stuffCtrl.deleteThing);

module.exports = router;