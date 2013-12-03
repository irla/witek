
exports.controller = {	
	index: function(req, res, next) { res.render({title: 'Rest Like Index'});},
	'new': function(req, res, next) { res.render({title: 'Rest Like New'});},
	create: function(req, res, next) { res.render({title: 'Rest Like Create'});},
	show: function(req, res, next) { res.render({title: 'Rest Like Show: ' + req.params.id});},
	edit: function(req, res, next) { res.render({title: 'Rest Like Edit: ' + req.params.id});},
	update: function(req, res, next) { res.render({title: 'Rest Like Update: ' + req.params.id});},
	destroy: function(req, res, next) { res.end('Destroyed');},
};