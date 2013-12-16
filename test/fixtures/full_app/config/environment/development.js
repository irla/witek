/** This file should be loaded first but only on development environment */
module.exports = function(app) {
	app.set('controllers path', __dirname + '/../../controllers'); // setting the path here just for testing	
};