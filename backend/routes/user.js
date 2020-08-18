// routes user

const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.createUser);
router.post('/login', userCtrl.readUser);

module.exports = router;