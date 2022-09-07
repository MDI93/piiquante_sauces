const User = require('../models/User');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
  console.log(req.body.email)
  //bcrypt.hash(req.body.password, 10)
    //.then(hash => {
      const user = new User ({
        email: req.body.email,
        password: req.body.password
      });
      console.log(user)
      user.save()
        .then(() => res.status(201).json({ message: 'New Account Created' }))
        .catch((error) => res.status(400).json({ error }));  
    
    // .catch(error => res.status(500).json({ error }));  
  next();
  };
 
// exports.login = (req, res, next) => {
//   User.findOne({ email: req.body.email })
//     .then(user => {
//       if (!user) {
//         return res.status(401).json({ error: 'Incorrect username/password pair' });
//       }
//       bcrypt.compare(req.body.password, user.password)
//         .then(valid => {
//           if (!valid) {
//             return res.status(401).json({ error: 'Incorrect username/password pair' });
//           }
//           res.status(200).json({
//             userId: user._id,
//             token: jwt.sign(
//             { userId: user._id },
//             'RANDOM_TOKEN_SECRET',
//             { expiresIn: '24h' }
//             )
//           });
//         })
//         .catch(error => res.status(500).json({ error }));
//     })
//     .catch(error => res.status(500).json({ error }));
// };