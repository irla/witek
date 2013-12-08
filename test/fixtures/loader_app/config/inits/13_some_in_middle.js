/** This file should be loaded fourth (second in inits) - ordered by name */
module.exports = function(app) {
	app.enable('some_in_middle');	
};