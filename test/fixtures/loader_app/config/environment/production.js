/** This file should be loaded second but only on production environment */
module.exports = function(app) {
	app.enable('production');	
};