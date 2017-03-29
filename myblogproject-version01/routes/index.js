var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
require('../database/model');
var User = mongoose.model('User');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', 
  	{ title: 'Express',
  	user:req.session.user,
  	logornot:req.session.logornot });
});
router.get('/reg',function(req,res){
	res.render('reg',{title:'Register',user:req.session.user});
});
router.post('/reg',function(req,res){
	if(req.body.password != req.body.password1){
		console.log('两次输入的口令不一样');
		return res.redirect('/reg');
	}
	var newUser = new User({
		username:req.body.username,
		password:req.body.password
	});
	User.find({username:req.body.username},function(err,user){
		if(user.length != 0){
			console.log('该用户已经存在')
			return res.redirect('/reg');
		}else{
			console.log('work1');
			newUser.save(function(err){
				if(err){
					return res.redirect('/reg');
				}
			})
			console.log('work2');
			req.session.user = newUser;
			req.session.logornot = true;
			console.log('注册成功');
			return res.redirect('/');
		}
	})
});
router.get('/logout',function(req,res){
	req.session.user = null;
	req.session.logornot = false;
	res.redirect('/');
});
router.get('/login',function(req,res){
	res.render('login',{title:'Login',user:req.session.user});
});
router.post('/login',function(req,res){
	User.find({username:req.body.username},function(err,user){
		if(user.length==0){
			console.log('该用户不存在');
			return res.redirect('/login');
		}else if(user[0].password != req.body.password){
			console.log('密码错误');
			return res.redirect('/login');
		}
		req.session.user = user[0];
		req.session.logornot = true;
		res.redirect('/');
	})
})
module.exports = router;
