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
    playService.create(playData, req.user._id)
    .then(createdPlay => {
        res.redirect('/')
    })
    .catch(err => {
        let error = Object.keys(err.errors).map(x => ({message: err.errors[x].message}))[0];
        res.render('partials/createPlay', {error})
    })
})

//EDIT PLAY

router.get('/edit/:playId',isAuth, (req, res, next) => {
    playService.getOne(req.params.playId, req.user._id)
    .then(play => {
        play.checked = play.isPublic ? 'checked' : ''
        res.render('partials/editPlay', {play});
    })
    .catch(next)
})
router.post('/edit/:playId', isAuth, (req, res, next) => {
    let {title, description, imageUrl, isPublic} = req.body;
    let playData = {
        title,
        description,
        imageUrl,
        isPublic : Boolean(isPublic)
    }
    
    playService.updateOne(req.params.playId, playData)
    .then(updatedPlay => {
       
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
        res.render('partials/details', play)
    })
    .catch(next)
})

//DELETE
router.get('/delete-play/:playId', (req,res, next) => {
    playService.deletePlay(req.params.playId)
    .then(() => {
        res.redirect('/')
    })
    .catch(next)
})



module.exports = router;
