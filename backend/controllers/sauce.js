// controller sauce

const Sauce = require('../models/sauce');

// Utilisation du package fs pour modificationn du système de fichiers
const fs = require('fs');

// Créer une sauce
exports.createSauce = (req, res, next) => {
  const sauceObjet = JSON.parse(req.body.sauce);
  const sauce = new Sauce({
    ...sauceObjet, // utilisation de l'opérateur spread (...) pour faire une copie de tous les élément de req.body
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

// suppression d'une sauce de la base de données
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
  const likes = req.body.like;
  Sauce.findOne({ _id: req.params.id })
  .then (sauce => {
    switch (likes) {
      case 1:
        if (!sauce.usersLiked.includes(userId)) { 
          console.log('user like')// comparaison du tableau usersliked avec l'id utilisateur pour savoir si il à deja voté
          Sauce.updateOne({ _id: req.params.id}, { $inc: {likes: 1}, $push: {usersLiked: userId}, _id:req.params.id}) // on ajoute 1 pour les likes et ont ajoute l'id utilisateur au tableau usersLiked
          .then(() => res.status(201).json({ message: 'Avis pris en compte !'}))
          .catch(error => res.status(400).json({ error }));
        }
        break;

      case 0:
        if (sauce.usersLiked.includes(userId)) {
          console.log('user like -1')
          // si l'utilisateur à deja liké la sauce ont retire son vote
          Sauce.updateOne({ _id: req.params.id}, { $inc: {likes: -1}, $pull: {usersLiked: userId}, _id:req.params.id})
          .then(() => res.status(201).json({ message: 'Avis retiré !'}))
          .catch(error => res.status(400).json({ error }));
        break;
        } else if (sauce.usersDisliked.includes(userId)) {
          console.log('user dislike -1')
          // sinon si l'utilisateur à deja disliké la sauce ont retire son vote
          Sauce.updateOne({ _id:req.params.id}, { $inc: {dislikes: -1}, $pull: {usersDisliked: userId}, _id:req.params.id})
          .then(() => res.status(201).json({ message: 'Avis retiré !'}))
          .catch(error => res.status(400).json({ error }));
        }
        break;

      case -1:
        if (!sauce.usersLiked.includes(userId)) {
          console.log('user dislike')
          Sauce.updateOne({ _id: req.params.id}, { $inc: {dislikes: 1}, $push: {usersDisliked: userId}, _id:req.params.id})
          .then(() => res.status(201).json({ message: 'Avis pris en compte !'}))
          .catch(error => res.status(400).json({ error }));
        }
        break;

      default: break;
    }
  })
  .catch(error => res.status(400).json({ error}));
}