//TODO:
//var mailer = require('../models/mailer');

exports.contact = function (req,res,next) {
	res.render('contact');
};


exports.receiveMessage = function (req,res,next) {

		res.send({message:'Your message has been successfully sent'});

};