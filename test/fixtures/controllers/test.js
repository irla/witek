
var actions = exports.actions = {
	test: function(req, res, next) { res.render({title: 'Test ' + req.params.id});}	
};




