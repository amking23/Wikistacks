var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack');

var page = db.define('page', {
	title: Sequelize.STRING,
	url_title: Sequelize.STRING,
	content: Sequelize.STRING,
	status: Sequelize.BOOLEAN
});

var user = db.define('user', {
	name: Sequelize.STRING,
	email: Sequelize.STRING
});