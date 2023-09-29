const Router = require('express');
const router = new Router();
const controlController = require('../controllers/controlController')

const bodyParser = require('body-parser')

const jsonParser = bodyParser.json()

router.post('/delete', jsonParser, controlController.delete)
router.post('/block', jsonParser, controlController.block)
router.post('/unblock', jsonParser, controlController.unblock)
router.get('/', controlController.getAll)

module.exports = router;