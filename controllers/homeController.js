const {Router} = require('express');
const router = Router();
const playService = require('../services/playService')

router.get('/', (req, res, next) => {
    console.log(req.user)
    if(req.user){
        playService.getAll()
        .then(plays => {
            console.log(plays)
            res.render('partials/home', {plays})
        })
        .catch(next)
    }else{
        res.render('partials/home')
    }
});




module.exports = router;