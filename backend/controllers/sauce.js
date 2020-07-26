// controllers sauce
const Sauce = require('../models/sauce'); 

// Creer une sauce
exports.createSauce = (req, res, next) => {
  console.log('hello');
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  console.log(sauceObject);
  const sauce = new Sauce({
    ...sauceObject,
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
  const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body};
    Sauce.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch( error => res.status(404).json({ error }));
};