const router = require('express').Router();
const authService = require('../services/authService');
const {COOKIE_NAME} = require('../config/config');
router.get('/logout', (req,res) => {
    res.clearCookie(COOKIE_NAME);
    res.redirect('/')
})

router.get('/login', (req, res) => {
    res.render('partials/login')
});
router.post('/login', (req, res, next)=>{
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

router.get('/register', (req, res) => {
    res.render('partials/register')
});

router.post('/register', (req, res, next)=>{
    const {username, password, rePassword} = req.body;
    if(password != rePassword){
        return res.render('partials/register', {error: {message : 'Passwords do not match.'}})
       
    }
    authService.register(username, password)
    .then(newUser => {
       res.redirect('/auth/login')
    })
    .catch(err => {
       next(err)
    }) 

      

});



module.exports = router;