/** This file should be loaded second but only on stage environment */
module.exports = function(app) {
	app.enable('stage');	
};