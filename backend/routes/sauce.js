//routes sauce

const express = require('express');
const router = express.Router(); 
const sauceCtrl = require('../controllers/sauce');

// utilisation des middlewares
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config'); 

// Ajout des middlewares pour les différentes routes Auth ou multer en fonction des différentes requêtes
router.post('/', auth, multer, sauceCtrl.createSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.get('/',auth, sauceCtrl.getAllSauces);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.delete('/:id',  auth, multer, sauceCtrl.deleteSauce);
router.post('/:id/like', auth, sauceCtrl.likeSauce);


module.exports = router;
