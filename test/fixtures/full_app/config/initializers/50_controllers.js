/** This file should be loaded third (first in inits) - ordered by name */
var witek = require('../../../../../'); // Just need to go to app folder
module.exports = function(app) {
	console.log(app.get('controllers path'));
	witek.controllers(app, {
		controllers: app.get('controllers path'),
		viewSuffix: 'html.ejs'
	});
};