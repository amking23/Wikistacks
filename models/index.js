var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack',{
	logging: false
});


function generateRandomURL(){
	var generatedURL=Math.floor(Math.random()*1000000000)




	return generatedURL.toString()
}

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
			route: function(){return '/wiki/' + this.url_title}},

			hooks: {

				beforeValidate: function(page,options){
					if (!page.title) page.title=generateRandomURL()
				}
		}
	//------------
	// {
	// 	hooks:{

	// 		beforeValidate: function(page,options){
	// 			if (!page.title) page.title=generateRandomURL()
	// 		}
	// 	}
	//-----------
});

var user = db.define('user', {
	/*name: Sequelize.STRING,
	email: Sequelize.STRING*/
	name: {type: Sequelize.STRING, allowNull: false},
	email: {type: Sequelize.STRING, allowNull: false, validate:{
		isEmail: true
	}}
});

page.belongsTo(user, {as: 'author'})


module.exports = {
	db: db,
	Page: page,
	User: user
}
