var fs = require('fs');

module.exports = function(app, ppath) {
	var path = ppath || './config';
	var envPath = path + '/environment/';

	var envFile = envPath + app.settings.env + '.js';
	if (fs.existsSync(envFile)) {
		require(envFile)(app);
	} else {
		console.log('Env not found! ' + envFile);
	}
	
	var allFile = envPath + 'all.js';	
	if (fs.existsSync(allFile)) {
		require(allFile)(app);
	} else {
		console.log('All not found! ' + allFile);
	}
	
	var initPath = path + '/initializers/';
	if (fs.existsSync(initPath)) {
		fs.readdirSync(initPath).forEach(function(file) {
			if (file.substr(-3) == '.js') {
				require(initPath + file)(app);
			}
		});
	} else {
		console.log('Initializers not found! ' + initPath);
	}
	
};
