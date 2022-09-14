const Sauces = require('../models/Sauces');
const fs = require('fs');

// Récupérer toutes les sauces
exports.getAllSauces = (req, res, next) => {
  Sauces.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }))
};

// Créer une sauce 
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce)
    delete sauceObject._id;
    delete sauceObject.userId;
    const sauce = new Sauces ({
      ...sauceObject,
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      likes: 0,
      dislikes: 0,
      usersLiked: [' '],
      usersdisLiked: [' ']
    });
  sauce.save()
      .then(() => res.status(201).json({ message: 'Sauce added' }))
      .catch(error => res.status(400).json({ error }));
  };

// Récuperer une seule sauce avec l'id
exports.getOneSauce = (req, res, next) => {
    Sauces.findOne({ _id: req.params.id })
      .then(sauces => res.status(200).json(sauces))
      .catch(error => res.status(404).json({ error }))
  };

// Modifier une sauce par le même utilisateur
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ? {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    delete sauceObject.userId;
    Sauces.findOne({ _id: req.params.id })
      .then((sauce) => {
        if(sauce.userId != req.auth.userId){
          res.status(401).json({ message: 'Unauthorized' });
        } else {
          Sauces.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Sauce modified'}))
          .catch(error => res.status(400).json({ error }))
        }})
      .catch(error => res.status(400).json({ error }));
  };

// Supprimer une sauce par le même utilisateur
exports.deleteSauce = (req, res, next) => {
    Sauces.findOne({ _id: req.params.id})
      .then(sauce => {
          if (sauce.userId != req.auth.userId) {
              res.status(401).json({message: 'Unauthorized'});
          } else {
              const filename = sauce.imageUrl.split('/images/')[1];
              fs.unlink(`images/${filename}`, () => {
                  Sauces.deleteOne({_id: req.params.id})
                      .then(() => { res.status(200).json({message: 'Sauce deleted'})})
                      .catch(error => res.status(401).json({ error }));
              });
          }
      })
      .catch( error => {
          res.status(500).json({ error });
      });
};

// Ajouter et/ou supprimer un like
exports.LikeOrDislike = (req, res, next) => {
  console.log("Like Or Dislike")
// Si like = 1, l'utilisateur aime (= like) la sauce       
    if( req.body.like === 1 ){
      Sauces.updateOne(
        { _id: req.params.id }, 
        { 
          $inc:{ likes: 1 }, 
          $push: { usersLiked: req.body.userId }
        }
        )
        .then(() => res.status(201).json({ message: 'Like has been added !' }))  
        .catch(error => res.status(400).json({ error }));

// Si like = -1, l'utilisateur n'aime pas (=dislike) la sauce       
      } else if( req.body.like === -1 ) {
        Sauces.updateOne(
          { _id: req.params.id }, 
          { 
            $inc:{ dislikes: 1 }, 
            $push: { usersDisliked: req.body.userId }
          }
          )
          .then(() => res.status(201).json({ message: 'Dislike has been added !' }))  
          .catch(error => res.status(400).json({ error }));
        } else {
// Si like = 0, l'utilisateur annule son like ou son dislike  
        Sauces.findOne({ _id: req.params.id })
          .then((likeThumbs) => {
            if(likeThumbs.usersLiked.includes(req.body.userId) && req.body.like === 0){
              Sauces.updateOne(
                { _id: req.params.id }, 
                { 
                  $inc:{ likes: -1 }, 
                  $pull: { usersLiked: req.body.userId }
                }
                )
                .then(() => res.status(201).json({ message: 'Like has been canceled !' }))  
                .catch(error => res.status(400).json({ error }));
            } else if(likeThumbs.usersDisliked.includes(req.body.userId) && req.body.like === 0) {
              Sauces.updateOne(
                { _id: req.params.id }, 
                { 
                  $inc:{ dislikes: -1 }, 
                  $push: { usersDisliked: req.body.userId }
                }
                )
                .then(() => res.status(201).json({ message: 'Dislike has been canceled !' }))  
                .catch(error => res.status(400).json({ error }));
            }
        })
          .catch(error => res.status(404).json({ error }));
}};

