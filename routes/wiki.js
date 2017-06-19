var express = require('express');
const router = express.Router();
var models = require('../models')
var Page = models.Page
var User = models.User

router.get('/',function(req,res){
  console.log('get /wiki')
  res.redirect('/')
})



router.post('/',function(req,res){
  var url
      url = req.body.title.replace(/[^a-zA-Z\d\s]/g,'').replace(/\s/g,'_')

  User.findOrCreate({where:{
    name: req.body.authorName,
    email: req.body.authorEmail
  }})
  .then(function(person)
   {
    var page = Page.build({
    title: req.body.title,
    content: req.body.pageContent,
    url_title: url,
    authorId: person[0].id
   })
  return page.save()
})
.then(page => res.redirect(page.route))
.then(result=>console.log(result))
.catch(err=>console.log(err))

  // console.log('page saved', page.dataValues)
  //res.render('wikipage',page.dataValues)

})

router.get('/add',function(req,res){

  res.render('addpage')
})

router.get('/:urlTitle', function(req, res, next){
  User.hasMany(Page, {foreignKey: 'authorId'})
  Page.belongsTo(User, {foreignKey: 'authorId'})
  Page.findOne({
    where: {url_title: req.params.urlTitle},
    include: [User]
  })
  .then(
    page => {
      console.log('dv',page.dataValues)
      console.log('p',page)
      console.log('p.ic', page.id)
      res.render('wikipage', page.dataValues)}
    //next();
  ).catch(
    error => res.json('error')
  )
})
module.exports = router;
