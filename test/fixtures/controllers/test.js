
exports.controller = {
	test: function(req, res, next) { res.render('test/test.html.ejs', {title: 'Test ' + req.params.id});}	
};