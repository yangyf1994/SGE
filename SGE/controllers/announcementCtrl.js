var Article = require('../models/articles');

exports.announcement = function (req,res,next) {

Article.paginate({},
{
	page: req.query.page,
  limit: req.query.limit,
  sortBy:{create_date:-1}
},
	function(err, articles, pageCount, itemCount) {

		if(err) return next(err);

		console.log('pageCount= '+pageCount);
		console.log('itemCount= '+itemCount);
		console.log(articles);
		res.render('announcements',{
			articles: articles,
			pageCount: pageCount,
			itemCount: itemCount
		});
	});

};

exports.listArticle = function (req,res,next) {
	Article.find({},null,{sort:{id:-1}},function (err,articles) {
			if(err) return next(err);
			res.send(articles);
	});
};


exports.postArticle = function (req,res) {

	//if(!req.body.title || !req.body.created_by ||!req.body.text)
	//		res.json({message:"Please fill out all the required fields"});

	var article = new Article();
	article.title = req.body.title;
	article.text = req.body.text;
 	article.published = false;
  article.created_by = req.body.created_by;

 	article.save(function (err) {
 		if(err)
 		{
 			res.send(err);
 			return;
 		}
 		res.send({success:"article added"});
 	});
};

exports.deleteArticle = function (req,res,next) {

	if(!req.params._id) return next(new Error('Id not provided'));
	Article.remove({
		_id:req.params._id
	},
	function (err) {
		if(err) res.send(err);
		res.send({message:'article removed'});
	});

};