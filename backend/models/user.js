//model user

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// utilisation du plugin "mongoose unique validator" pour s'assurer que l'email utilisé n'existe pas déja
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);