var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack',{
	logging: false
});

var page = db.define('page', {
	/*
	title: Sequelize.STRING,
	url_title: Sequelize.STRING,
	content: Sequelize.STRING,
	status: Sequelize.BOOLEAN*/
	title: {type: Sequelize.STRING, allowNull: false},
	url_title: {type: Sequelize.STRING, allowNull: false, validate:{
		//isUrl: true
	}},
	content: {type: Sequelize.STRING, allowNull: false},
	status: {type: Sequelize.ENUM('open', 'closed')},
	date: {type: Sequelize.DATE, defaultValue: Sequelize.NOW}},
	{

	getterMethods:{
		route: function(){return '/wiki/' + this.url_title}
	}
});

var user = db.define('user', {
	/*name: Sequelize.STRING,
	email: Sequelize.STRING*/
	name: {type: Sequelize.STRING, allowNull: false},
	email: {type: Sequelize.STRING, allowNull: false, validate:{
		isEmail: true
	}}
});

module.exports = {
	db: db,
	Page: page,
	User: user
}
