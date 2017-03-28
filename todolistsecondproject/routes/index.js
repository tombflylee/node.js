var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
require('../database/model');
var Todo = mongoose.model('Todo');

/* GET home page. */
router.get('/', function(req, res, next) {
	Todo.find(function(err,todo){
		res.render('index',{allContent:todo});
	})
});

router.get('/add',function(req,res){
	var content = req.query.content;
	var todo = new Todo({
		content:content,
		done:false
	});
	todo.save(function(err,todo){
		if(err){
			console.log(err);
		}else{
			res.write(todo.id);
		}
		res.end();
	});
});

router.get('/delete',function(req,res){
	var id = mongoose.Types.ObjectId(req.query.id);
	Todo.findById({'_id':id},function(err,todo){
		if(err){
			console.log(err);
		}else{
			todo.remove(function(err,todo){
				res.redirect('/');
			})
		}
	});
});

router.get('/done',function(req,res){
	var id = mongoose.Types.ObjectId(req.query.id);
	Todo.update({'_id':id},{'done':true},function(err,todo){
		if(err){
			console.log(err);
		}else{
			res.redirect('/');
		}
	})
})
module.exports = router;
