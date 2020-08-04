// controllers sauce
const Sauce = require('../models/sauce');
const fs = require('fs');

// Creer une sauce
exports.createSauce = (req, res, next) => {
  const sauceObjet = JSON.parse(req.body.sauce);
  const sauce = new Sauce({
    ...sauceObjet,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauce.save()
    .then(() => res.status(201).json({ message: 'Nouvelle sauce créé !' }))
    .catch(error => res.status(400).json({ error })); 
};

// Obtenir la liste de toutes les sauces
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
      .then(sauces => res.status(200).json(sauces))
      .catch(error => res.status(400).json({ error }));
};

// Obtenir une sauce grâce a son Id
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
};


// Modifier une sauce
exports.modifySauce = (req, res, next) => {
  const sauceObjet = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body};
    Sauce.updateOne({ _id: req.params.id}, { ...sauceObjet, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch( error => res.status(404).json({ error }));
};

// suppression d'une sauce de la BDD
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({_id: req.params.id})
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id:req.params.id})
          .then(() => res.status(200).json({ message: 'Sauce supprimée'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({error }));
}

// like ou dislike sauce
exports.likeSauce = (req, res, next) => {
  const userId = req.body.userId;
  const likes = req.body.likes;

  Sauce.findOne({ _id: req.params.id })
  .then((sauce => {
    switch (likes) {
      case 1:
      case 0:
      case -1:
    }
  }))
}