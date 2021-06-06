const {
    Router
} = require('express');
const router = Router();
const isAuth = require('./middlewares/isAuth');
const authService = require('./services/authService');
const playService = require('./services/playService')
const {COOKIE_NAME} = require('./config/config')
module.exports = (app) => {

//HOME
    app.get('/', (req, res, next) => {
        playService.getAll()
        .then(plays => {
            res.render('partials/home', {plays})
        })
        .catch(next)
    });

//PLAYS
    app.get('/create',isAuth, (req, res) => {
        res.render('partials/createPlay');
        
    })
    app.post('/create',isAuth, (req, res, next) => {
        let {title, description, imageUrl, isPublic} = req.body;
        let playData = {
            title,
            description,
            imageUrl,
            isPublic : Boolean(isPublic)
        }
        console.log(playData)
        playService.create(playData)
        .then(createdPlay => {
            console.log(createdPlay)
            res.redirect('/')
        })
        .catch(next)
    })

    //Details
    app.get('/details/:playId',(req, res, next) => {
        
        playService.getOne(req.params.playId)
        .then(play => {
            res.render('partials/details', {play})
        })
        .catch(next)
    })



// AUTH
    app.get('/logout', (req,res) => {
        res.clearCookie(COOKIE_NAME);
        res.redirect('/')
    })
    app.get('/login', (req, res) => {
        res.render('partials/login')
    });
    app.post('/login', (req, res, next)=>{
        const {username, password} = req.body;
        
            authService.login(username, password)
            .then(token => {
                res.cookie(COOKIE_NAME, token, {httpOnly: true})
                
               res.redirect('/')
            })
            .catch(err => {
               next(err)
            }) 

    });

    app.get('/register', (req, res) => {
        res.render('partials/register')
    });

    app.post('/register', (req, res, next)=>{
        const {username, password, rePassword} = req.body;
        if(password != rePassword){
            res.render('partials/register', {error: {message : 'Passwords do not match.'}})
            return;
        }
        authService.register(username, password)
        .then(newUser => {
           res.redirect('/login')
        })
        .catch(err => {
           next(err)
        }) 

          

    });
    

    
}