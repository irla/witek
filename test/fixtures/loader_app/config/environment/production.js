/** This file should be loaded first but only on production environment */
module.exports = function(app) {
	app.enable('production');	
};