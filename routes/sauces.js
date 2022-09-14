const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const saucesCtrl = require('../controllers/sauces');

// Point d'accès pour récupèrer les sauces depuis l'API
router.get('/' , auth, saucesCtrl.getAllSauces);
// Point d'accès pour ajouter des sauces sur la base de donnée
router.post('/' , auth, multer, saucesCtrl.createSauce)
// Point d'accès pour récupèrer une sauce depuis l'API avec un ID
router.get('/:id' , auth, saucesCtrl.getOneSauce);
// Point d'accès pour modifier une sauce avec son ID
router.put('/:id' , auth, multer, saucesCtrl.modifySauce)
// Point d'accès pour supprimer une sauce avec son ID
router.delete('/:id' , auth, saucesCtrl.deleteSauce)
// Point d'accès pour ajouter un like
router.post('/:id/like' , auth, saucesCtrl.LikeOrDislike)

module.exports = router;