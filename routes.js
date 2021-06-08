const {
    Router
} = require('express');
const router = Router();
const isAuth = require('./middlewares/isAuth')
const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const playController = require('./controllers/playController');

router.use('/', homeController)
router.use('/auth', authController);
router.use('/play', isAuth, playController);


module.exports = router;


