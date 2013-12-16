/** This file should be loaded first in inits - ordered by name */

var ejslocals = require('ejs-locals');

module.exports = function(app) {
	app.set('views', __dirname + '/../../views');
	app.set('view engine', 'ejs');
	app.engine('ejs', ejslocals);
};