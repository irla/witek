
exports.baseUrl = 'albums/:albumId';
exports.actions = {
		
	index: function(req, res, next) { 
		res.render({title: 'Base Url Index. Parent Id: ' + req.params.albumId});
	},
	
	custom: function(req, res, next) { 
		res.render({title: 'Custom action in photo', albumId: req.params.albumId || 'None', id: req.params.id});
	},
	
	detailed: {
		get: function(req, res, next) {
			res.render({title: 'Detailed Get Action', albumId: req.params.albumId || 'None', id: req.params.id});
		},
		post: function(req, res, next) {
			res.render({title: 'Detailed Post Action', albumId: req.params.albumId || 'None', id: req.params.id});
		}
	},
	
	detailedWithRelativeUrl: {
		url: 'relativePath/:id',
		put: function(req, res, next) {
			res.render({title: 'Detailed Relative Url Put', albumId: req.params.albumId, id: req.params.id});
		},
		del: function(req, res, next) {
			res.render({title: 'Detailed Relative Url Delete', albumId: req.params.albumId, id: req.params.id});
		}
	},
	
	detailedWithAbsolutUrl: {
		url: '/absolutePath/:id',
		get: function(req, res, next) {
			res.render({title: 'Detailed Absolute Url Get', albumId: req.params.albumId || 'None', id: req.params.id});
		},
		post: function(req, res, next) {
			res.render({title: 'Detailed Absolute Url Post', albumId: req.params.albumId || 'None', id: req.params.id});
		}
	}
};

