// app.js

// import des modules npm
const express = require('express');
const helmet = require("helmet");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

// import des routes User et Sauce
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');

const app = express();

// utilisation du module 'dotenv' pour masquer les informations de connexion à la base de données à l'aide de variables d'environnement
require('dotenv').config();

// utilisation du module 'helmet' 
app.use(helmet());

// Connection a la base de données
mongoose.connect('mongodb+srv://'+process.env.DB_USER+':'+process.env.DB_PASS+'@cluster0.0n1zf.mongodb.net/P6OCR?retryWrites=true&w=majority',
{useNewUrlParser: true,
  useUnifiedTopology:true})
  .then(()=>console.log('connexion à mongoDB réussie'))
  .catch(()=> console.log('connexion à mongoDB echec'));
  
// Setting du header des requêtes pour la gestion des erreurs CORS
app.use((req, res, next) =>{
    // Autorisation d'acceder a l'API depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Ajouter les headers suivants au requete envoyées à l'API
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // Autoriser les methodes mentionnées pour les requêtes API
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Utilisation de bodyparser pour transformer le corps des requêtes en objet json exploitable.
app.use(bodyParser.json());

// Chemins d'accès des différents endpoints
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

// Export de l'application express
module.exports = app;