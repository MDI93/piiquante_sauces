const User = require('../models/User');
// Crypter l'adresse eMail 'crypto-js'
const cryptoJs = require('crypto-js');
// Crypter/hasher le mot de passe 'bcrypt'
const bcrypt = require('bcrypt');
// Utiliser un token
const jwt = require('jsonwebtoken');

// Variable d'environnement
const dotenv = require('dotenv');
const result = dotenv.config();

exports.signup = (req, res, next) => {
  const emailCryptoJs = cryptoJs.HmacSHA384(req.body.email, `${process.env.crypto_key}`).toString();
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User ({
        email: emailCryptoJs,
        password: hash
      });
      console.log(user)
      user.save()
        .then(() => res.status(201).json({ message: 'New Account Created' }))
        .catch((error) => res.status(400).json({ error }));  
    })
    .catch(error => res.status(500).json({ error }));  
  //next();
};
 
exports.login = (req, res, next) => {
  const emailCryptoJs = cryptoJs.HmacSHA384(req.body.email, `${process.env.crypto_key}`).toString();
  User.findOne({ email: emailCryptoJs })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Incorrect username/password pair' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Incorrect username/password pair' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
            { userId: user._id },
            `${process.env.token_key}`,
            { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};