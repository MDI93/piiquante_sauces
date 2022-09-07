const sauces = require('../models/sauces')

exports.createSauce = (req, res, next) => {
    delete req.body._id;
    const sauce = new sauce ({
      ...req.body
    });
    login.save()
      .then(() => res.status(201).json({ message: 'Sauce added' }))
      .catch(error => res.status(400).json({ error }));
    next();
  };

exports.modifySauce = (req, res, next) => {
    sauces.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Sauce modified'}))
      .catch(error => res.status(404).json({ error }));
    next();
  };

exports.deleteSauce = (req, res, next) => {
    sauces.deleteOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Sauce deleted'}))
      .catch(error => res.status(404).json({ error }));
    next();
  };

exports.getOneSauce = (req, res, next) => {
    sauces.findOne({ _id: req.params.id })
      .then(sauces => res.status(200).json(sauces))
      .catch(error => res.status(404).json({ error }))
    next();
  };
 
exports.getSauces = (req, res, next) => {
    sauces.find()
      .then(sauces => res.status(200).json(sauces))
      .catch(error => res.status(400).json({ error }))
    next();
  };
  
exports.CreateSauceLike = (req, res, next) => {

}