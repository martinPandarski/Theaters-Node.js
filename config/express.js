const express = require('express')
const cookieParser = require('cookie-parser')
const hbs = require('express-handlebars');
const auth = require('../middlewares/auth')


module.exports =  (app) => {
        app.engine('.hbs', hbs({
            extname: '.hbs'
        }))
        app.set('view engine', '.hbs');
        app.use('/public', express.static('public'));

        app.use(express.urlencoded({extended: true}));
        app.use(cookieParser());

        app.use(auth);
}



