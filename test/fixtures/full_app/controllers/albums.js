

exports.actions = {
		
	'index': function(req, res, next){
		res.render({title: 'Albums index'});
	},
	
	'new': function(req, res, next){
		res.render({title: 'Albums new'});
	},
	
	'create': function(req, res, next) {
		res.render({title: 'Albums create'});
	},
	
	'edit': function(req, res, next) {
		res.render({title: 'Albums edit', albumId: req.params.id});
	}
};

/** routes has to be handled in next versions, should we implement them?*/
exports.routes = function(app) {
	
};

/** hanlders has to ba handled in next versions */
exports.handlers = {
	measure: function(req, res, next) {
		
		this.before = [exports.actions.index, exports.actions.create];
		this.after = [exports.actions.index];
	},
	setUser: function(req, res, next) {
		
	}
};
exports.handlers.measure.before = [exports.actions.index, exports.actions.create];
exports.handlers.setUser.before = exports.actions.index;
exports.handlers.measure.after = 'all';