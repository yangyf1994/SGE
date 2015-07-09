exports.contact = function (req,res,next) {
	res.render('contact');
};


exports.receiveMessage = function (req,res,next) {

	console.log(req.body);
	console.log(req.body.name);
	res.send({message:'success'});
};