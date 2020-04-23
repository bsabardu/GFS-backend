const express = require('express');
const router = express.Router();
const Thing = require('../models/Thing');
const stuffCtrl = require('../controllers/stuff');

router.post('/', stuffCtrl.createThing);
router.get('/', stuffCtrl.readAllThing);
router.get('/:id', stuffCtrl.readOneThing);
router.put('/:id', stuffCtrl.updateThing);
router.delete('/:id', stuffCtrl.deleteThing);

module.exports = router;