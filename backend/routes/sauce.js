//routes sauce

const express = require('express');
const router = express.Router(); 
const sauceCtrl = require('../controllers/sauce');

// utilisation des middlewares
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config'); 

// Ajout des middlewares pour les différentes routes Auth ou multer en fonction des différentes requêtes
router.post('/', auth, multer, sauceCtrl.createSauce);
router.put('/:id', auth, multer, sauceCtrl.updateSauce);
router.get('/',auth, sauceCtrl.readAllSauces);
router.get('/:id', auth, sauceCtrl.readOneSauce);
router.delete('/:id',  auth, multer, sauceCtrl.deleteSauce);
router.post('/:id/like', auth, sauceCtrl.likeSauce);


module.exports = router;
