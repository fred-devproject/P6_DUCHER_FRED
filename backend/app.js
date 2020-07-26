
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');

const app = express();



mongoose.connect('mongodb+srv://fred-devproject:george1984orwell@cluster0.0n1zf.mongodb.net/P6OCR?retryWrites=true&w=majority',
{useNewUrlParser: true,
  useUnifiedTopology:true})
  .then(()=>console.log('connexion à mongoDB réussie'))
  .catch(()=> console.log('connexion à mongoDB echec'));
  
  
app.use((req, res, next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;