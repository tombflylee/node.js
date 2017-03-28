var mongoose = require('mongoose');

var TodoSchema = new mongoose.Schema({
	content:String,
	done:Boolean
});
mongoose.model('Todo',TodoSchema);