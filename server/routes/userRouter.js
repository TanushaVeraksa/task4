const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/AuthMiddleware');
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json()

router.post('/registration', jsonParser, userController.registration)
router.post('/login', jsonParser, userController.login)
router.get('/autorization', authMiddleware, userController.check)
router.post('/block', jsonParser, userController.isBlock)

module.exports = router;