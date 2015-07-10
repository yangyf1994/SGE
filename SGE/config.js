var mongoProdUri = process.env.MONGOLAB_URI || 'mongodb://@localhost:27017/SGE';

var config = {
	local: {
		mode: 'local',
		port: 3000,
		mongoUrl: 'mongodb://@localhost:27017/SGE',

	},
	prod: {
		mode: 'prod',
		port: process.env.PORT || 5000,
		mongoUrl: mongoProdUri,
	}
};

module.exports = function (mode) {
	return config[mode || process.argv[2] || 'local'] || config.local;
};