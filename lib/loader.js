var fs = require('fs');

module.exports = function(app, ppath) {
	var path = ppath || './config';
	var envPath = path + '/environment/';

	// First load environment dependent config
	var envFile = envPath + app.settings.env + '.js';
	if (fs.existsSync(envFile)) {
		require(envFile)(app);
	} else {
		console.log('File ' + envFile + ' does not exists.');
	}
	
	// Then load config for all environments
	var allFile = envPath + 'all.js';	
	if (fs.existsSync(allFile)) {
		require(allFile)(app);
	} else {
		console.log('File ' + allFile + ' does not exists.');
	}
	
	// And after this load initializers in alphabetical order
	var initPath = path + '/initializers/';
	if (fs.existsSync(initPath)) {
		fs.readdirSync(initPath).forEach(function(file) {
			if (file.substr(-3) == '.js') {
				require(initPath + file)(app);
			}
		});
	} else {
		console.log('File ' + initPath + ' does not exists.');
	}
	
};
