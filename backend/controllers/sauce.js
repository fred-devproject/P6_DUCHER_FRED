// controllers sauce
const Sauce = require('../models/sauce') 

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauce.save()
    .then(() => res.status(201).json({ message: 'Nouvelle sauce créé !' }))
    .catch(error => res.status(400).json({ error })); 
};


/*exports.getAllSauces = (req, res,) => {
    Sauce.find()
      .then((sauce) => res.status(200).json(sauce))
      .catch((error) => res.status(400).json({ error }))
}*/
