var Article = require('../models/articles');

exports.announcement = function (req,res,next) {

Article.paginate({},{ page: req.query.page, limit: req.query.limit },
	function(err, articles, pageCount, itemCount) {

		if(err) return next(err);

		console.log('pageCount= '+pageCount);
		console.log('itemCount= '+itemCount);

		res.render('announcements',{articles: articles});
	});

};


exports.deleteArticle = function (req,res,next) {
	console.log('im fukcing here');
	next();
	/*
	if(!req.params.id) return next(new Error('No article id'));
	Article.remove({
		_id:req.params.id
	},function (err) {
		if(err) return res.send(err);
		res.json({message:'article deleted'});
	});
*/
};
exports.listArticle = function (req,res,next) {
	Article.find({},null,{sort:{id:-1}},function (err,articles) {
			if(err) return next(err);
			res.json(articles);
	});
};


exports.postArticle = function (req,res,next) {
	if(!req.body.title || !req.body.text || !req.body.created_by)
			res.json({message:"Please fill out all the required fields"});
	var article = {
		title: req.body.title,
		text: req.body.text,
		published: false,
		created_by: req.body.created_by
	};

	Article.create(article,function (err,articleRes) {
		if(err) return next(err);
		res.json({message:"Article added. Wait for admin to approve"});
	});
};
