const Router = require('express');
const router = new Router();
const controlRouter = require('./controlRouter');
const userRouter = require('./userRouter');

router.use('/user', userRouter)
router.use('/control', controlRouter)

module.exports = router;