exports.actions = {
	'index' : {
		url: '/',
		get: function(req, res, next) {
			res.render({title: 'Welcome page'});
		}
	}	
};