const {Router} = require('express');
const router = Router();
const playService = require('../services/playService')

router.get('/', (req, res, next) => {
        playService.getAll()
        .then(plays => {

            res.render('partials/home', {plays})
        })
        .catch(next)
    
});




module.exports = router;