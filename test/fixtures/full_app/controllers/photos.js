
exports.baseUrl = '/albums/:albumId';
	
exports.actions = {
		
	'index': function(req, res, next){
		res.render({title: 'Photos index', albumId: req.params.albumId});
	},
	
	'new': function(req, res, next){
		res.render({title: 'Photos new', albumId: req.params.albumId});
	},
	
	'create': function(req, res, next) {
		res.render({title: 'Photos create', albumId: req.params.albumId});
	},
	
	'edit': function(req, res, next) {
		res.render({title: 'Photos edit', albumId: req.params.albumId, photoId: req.params.id});
	},
	
	'doSomething': function(req, res, next) {
		res.render({title: 'Do something', albumId: req.params.albumId, photoId: req.params.id});
	},
	
	'store' : {
		url: '/photos/store/:id',
		get: function(req,res, next) {
			res.render({title: 'Photos store get', albumId: req.params.albumId || 'None', photoId: req.params.id});	
		},
		post: function(req, res, next) {
			res.render({title: 'Photos store post', albumId: req.params.albumId || 'None', photoId: req.params.id});
		}
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