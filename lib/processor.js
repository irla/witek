var fs = require('fs');

var processor = exports.processor = function(app, fileName, controller) {
	
	var controllerName = fileName.substr(0, fileName.length - 3);
	
	var baseUrl = controller.baseUrl || '';
	if (baseUrl) {
		baseUrl += '/';
	}	
	
	var getUrl = function(actionName, action) {
		var url = {};
		
		var forStandarAction = function() {
			url.url = baseUrl + controllerName;
			if (['show', 'edit', 'update', 'destroy'].indexOf(actionName) > -1) {
				url.url += '/:id';
			}
			if (['index', 'show'].indexOf(actionName) > -1) {
				url.method = 'get';
			} else if (actionName == 'new') {
				url.method = 'get';
				url.url += '/new';
			} else if (actionName == 'create') {
				url.method = 'post';
			} else if (actionName == 'edit') {
				url.url += '/edit';
				url.method = 'get';
			} else if (actionName == 'update') {				
				url.method = 'put';
			} else if (actionName == 'destroy') {
				url.method = 'del';
			}
		};
		
		var forCustomAction = function() {
			url.method = 'get';
			url.url = baseUrl + controllerName + '/' + actionName + '/:id?';
		};
		
		if (typeof(action) == 'function') {
			if (['index', 'new', 'create', 'show', 'edit', 'update', 'destroy'].indexOf(actionName) > -1) {
				forStandarAction();
			} else {
				forCustomAction();
			}
		} else {
			
		}
		return url;
	};
	
	for(var actionName in controller) {
		var action = controller[actionName];
		var url = getUrl(actionName, action);
		
		app[url.method](func); // routing is here
	}
};

exports.process = function(app, fileName, controller) {

	fs.readdirSync(controllersPath).forEach(function(file) {
		if (file.substr(-3) == '.js') {
			var controller = require(controllersPath + '/' + file);
			if (controller.route) {
				controller.route(app);
			} else if (controller.controller){
				processSimple(app, file, controller.controller);
			}
		}
	});
};