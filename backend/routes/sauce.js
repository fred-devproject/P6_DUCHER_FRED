//routes sauce

const express = require('express');
const router = express.Router(); 

const sauceCtrl = require('../controllers/sauce');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config'); 

router.post('/', auth, multer, sauceCtrl.createSauce);
/*router.put('/:id', auth, sauceCtrl.modifySauce);
router.delete('/:id',  auth, multer, sauceCtrl.deleteSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.get('/', auth, sauceCtrl.getAllSauces);
router.post('/:id/like', auth, sauceCtrl.likeSauce);
*/

module.exports = router;
