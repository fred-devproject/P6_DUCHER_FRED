// controllers user
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Utilisation de dotenv
require('dotenv').config();

// Fonction pour la création d'un nouvel utilisateur
exports.createUser = (req, res, next) => {
    // hash du mot de passe avec bcrypt
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !'}))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

// Fonction pour la connexion d'un utilisateur existant
exports.readUser = (req, res, next) => {
    User.findOne({ email: req.body.email})
    .then( user=> {
        if (!user){
            return res.status(401).json({ error: 'Utilisateur non trouvé !'})
        }
        // comparaison du mot de passe avec le hash bcrypt
        bcrypt.compare(req.body.password, user.password)
        .then((valid) => {
            if (!valid) {
                return res.status(401).json({ error:'Mot de passe incorrect !'});
            }

            res.status(200).json({
                userId: user._id,
                // token d'authentification attribué par jwt
                token: jwt.sign(
                    { userId: user._id },
                    ( process.env.AUTH_TOKEN ),
                    { expiresIn: '24h' }
                ),
            });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
}; 