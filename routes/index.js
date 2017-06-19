var express = require('express');
const userRouter = require('./users.js')
const wikiRouter = require('./wiki.js')
const router = express.Router();
var models = require('../models')
var Page = models.Page
var User = models.User

router.get('/', function(req, resp){
	Page.findAll()
	.then(pages => resp.render('index', {pages: pages}))
});

router.use('/users',userRouter)
router.use('/wiki', wikiRouter)

module.exports = router;
