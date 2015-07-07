var mongoose = require('mongoose');


var ArticleSchema = new mongoose.Schema({
	title:{
		type: String,
		required: true,
		default:"New Post"
	},
	text: String,
	published:{
		type: Boolean,
		default:false
	},
	create_date:{
		type: Date,
		default: Date.now
	},
	created_by: String

});

ArticleSchema.plugin(require('mongoose-paginate'));

module.exports = mongoose.model('Article',ArticleSchema,'article');