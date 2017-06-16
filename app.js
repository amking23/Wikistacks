var nunjucks = require("nunjucks");
var morgan = require('morgan');
var bodyParser = require('body-parser');
var express = require('express');
var router = require('./routes');

var app = express();
const logger = morgan('dev');
app.use(logger);
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({extended: false});

app.use(jsonParser);
app.use(urlencodedParser);
app.engine('html', nunjucks.render);
app.set('view engine', 'html');
nunjucks.configure('views', {
	autoescape: true,
	express: app,
	watch: true,
	noCache: true
});

app.use('/', router);
app.use(express.static('public'));

app.listen(3000, function(){
	console.log('server listening');
})