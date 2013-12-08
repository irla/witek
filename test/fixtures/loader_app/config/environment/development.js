/** This file should be loaded second but only on development environment */
module.exports = function(app) {
	app.enable('development');	
};