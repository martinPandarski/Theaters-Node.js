const {
    Router
} = require('express');
const router = Router();
const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const playController = require('./controllers/playController');

router.use('/', homeController)
router.use('/auth', authController);
router.use('/play', playController);


module.exports = router;


