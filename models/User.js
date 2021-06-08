const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {SECRET, SALT_ROUNDS} = require('../config/config')
const userSchema = new mongoose.Schema({
    username : { 
        type: String,
        required: true,
        unique: true,
        minLength: [3, 'Username should be at least 3 characters long.'],
        validate: /^[a-zA-Z0-9]+$/
    },
    password : {
        type: String,
        required: true,
        minLength: [3, 'Passwprd should be at least 3 characters long.'],
        validate: /^[a-zA-Z0-9]+$/
    },
    likedPlays : [{
        type: mongoose.Types.ObjectId,
        ref: 'Play'
    }]
});

userSchema.pre('save', function(next){
    bcrypt.genSalt(SALT_ROUNDS)
    .then(salt => bcrypt.hash(this.password, salt))
    .then(hash => {
        this.password = hash
        next();
    })
})


module.exports = mongoose.model('User', userSchema)