
var api_key; //TODO
var domain;//TODO

var mailgun = require('mailgun-js')({apiKey: api_key,domain:domain});

exports.sendOne = function (locals,callback) {
	console.log(locals);

	var data = {
  from: 'HelloWorld <me@samples.mailgun.org>',
  to: 'yang-yifeng@hotmail.com',
  subject: 'Hello World',
  text: 'Testing some Mailgun awesomness!'
};

	mailgun.message().send(data,function (err,body) {
		if(err) return callback(err);
		return callback(null,body);
	});
};