const {Router} = require('express');
const router = Router();
const playService = require('../services/playService')

router.get('/', (req, res, next) => {
    
     if(req.user){
        playService.getAll(req.query.sortBy)
        .then(plays => {

            res.render('partials/home', {plays})
        })
        .catch(next)
        
    }
    else{
        // res.render('partials/home')
        playService.getPopular(3)
        .then(plays => {
            res.render('partials/home', {plays})
        })
        .catch(next)
    }
});




module.exports = router;