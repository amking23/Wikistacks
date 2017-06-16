var express = require('express');
const userRouter = require('./user.js')
const wikiRouter = require('./wiki.js')
const router = express.Router();

router.get('/', function(req, resp){
	resp.render('index');
});

router.use('/user',userRouter)
router.use('/wiki', wikiRouter)

module.exports = router;
