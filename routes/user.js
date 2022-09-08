const express = require('express');

const router = express.Router();

const passwordSchema = require('../middleware/password')
const userCtrl = require('../controllers/user');


// Point d'accès lors de la création d'un nouveau compte
router.post('/signup', passwordSchema,  userCtrl.signup);
// Point d'accès lorsque le visiteur est déjà inscrit
router.post('/login', userCtrl.login);

module.exports = router;