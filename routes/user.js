const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

const userCtrl = require('../controllers/user');


// Point d'accès lors de la création d'un nouveau compte
router.post('/signup', auth, userCtrl.signup);
// Point d'accès lorsque le visiteur est déjà inscrit
router.post('/login', auth, userCtrl.login);

module.exports = router;