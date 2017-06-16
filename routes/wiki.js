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
  console.log('post!')
  var url = req.body.title.replace(/[^a-zA-Z\d\s]/g,'').replace(/\s/g,'_')
  var page = Page.build({
    title: req.body.title,
    content: req.body.pageContent,
    url_title: url
  })
  page.save()
  .then(result=>console.log(result))
  .catch(err=>console.log(err))

  console.log('page saved')
  res.redirect('/wiki')
})

router.get('/add',function(req,res){

  res.render('addpage')
})
module.exports = router;
