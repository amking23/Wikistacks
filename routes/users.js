var express = require('express');
const router = express.Router();
let models = require('../models')
let Page = models.Page
let User = models.User

router.get('/',function(req,res){
  User.findAll()
  .then(
    users => res.render('user', {users: users})
  )
  .catch(
    error => console.log(error)
  )
})

router.get('/:id',function(req,res){
  User.hasMany(Page, {foreignKey: 'authorId'})
  Page.belongsTo(User, {foreignKey: 'authorId'})
  User.findOne({
    where: {id: req.params.id},
    include: [Page]
  })
  .then(
    // user => res.json(user)

    user => res.render('userpage', user)
  )
})
module.exports = router;
