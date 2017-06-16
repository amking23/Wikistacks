var express = require('express');
const router = express.Router();

router.get('/', function(req, resp){
	resp.render('index');
});