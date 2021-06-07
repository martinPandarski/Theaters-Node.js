const router = require('express').Router();
const isAuth = require('../middlewares/isAuth');
const playService = require('../services/playService')
//PLAYS
router.get('/create',isAuth, (req, res) => {
    res.render('partials/createPlay');
    
})
router.post('/create', isAuth, (req, res, next) => {
    let {title, description, imageUrl, isPublic} = req.body;
    let playData = {
        title,
        description,
        imageUrl,
        isPublic : Boolean(isPublic)
    }
    playService.create(playData)
    .then(createdPlay => {
        res.redirect('/')
    })
    .catch(next)
})

router.get('/edit/:playId',isAuth, (req, res) => {
    playService.getOne(req.params.playId, req.user._id)
    .then(play => {
        res.render('partials/editPlay', {play});
    })
    
})
router.post('/edit/:playId', isAuth, (req, res, next) => {
    let {title, description, imageUrl, isPublic} = req.body;
    let playData = {
        title,
        description,
        imageUrl,
        isPublic : Boolean(isPublic)
    }
    playService.create(playData)
    .then(createdPlay => {
        
        res.redirect('/')
    })
    .catch(next)
})

//LIKE A PLAY

router.get('/like/:playId', (req, res, next) => {

    playService.likePlay(req.params.playId, req.user._id)
    .then(() => {
        res.redirect(`/play/details/${req.params.playId}`)
    })
    .catch(next);
})

//Details
router.get('/details/:playId',(req, res, next) => {
    playService.getOne(req.params.playId, req.user._id)
    .then(play => {
        console.log(play)
        res.render('partials/details', play)
    })
    .catch(next)
})




module.exports = router;
