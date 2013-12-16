/**
 * controllers library will read controllers folder
 * 
 */
var fs = require('fs');

var getActionDescs = exports.getActionDescs = function(actionName, action, controllerName, controller) {

	
	var baseUrl = controller.baseUrl || '';
	if (baseUrl && baseUrl.charAt(0) !== '/') {
		baseUrl = '/' + baseUrl;
	}
	
	var actionDescs = [];
	var actionDesc = {};
	
	var forStandarAction = function() {
		actionDesc.url = baseUrl + '/' + controllerName;
		if (['show', 'edit', 'update', 'destroy'].indexOf(actionName) > -1) {
			actionDesc.url += '/:id';
		}
		if (['index', 'show'].indexOf(actionName) > -1) {
			actionDesc.method = 'get';
		} else if (actionName == 'new') {
			actionDesc.method = 'get';
			actionDesc.url += '/new';
		} else if (actionName == 'create') {
			actionDesc.method = 'post';
		} else if (actionName == 'edit') {
			actionDesc.url += '/edit';
			actionDesc.method = 'get';
		} else if (actionName == 'update') {				
			actionDesc.method = 'put';
		} else if (actionName == 'destroy') {
			actionDesc.method = 'del';
		}
		actionDesc.isStandard = true;
	};
	
	var forCustomAction = function() {
		actionDesc.method = 'get';
		actionDesc.url = baseUrl + '/' + controllerName + '/' + actionName + '/:id?';
	};
	
	var getUrlForDetailedAction = function(){
		if (action.url) {
			if (action.url.charAt(0) == '/') {
				return action.url;
			}
			return baseUrl + '/' + controllerName + '/' + action.url;
		}
		return baseUrl + '/' + controllerName + '/' + actionName + '/:id?';
	};
	
	var forDetailedAction = function() {
		var url = getUrlForDetailedAction();
		var types = ['get', 'post', 'put', 'del'];
		for (var i in types) {
			var type = types[i];			
			if (typeof(action[type]) === 'function') {
				actionDescs.push({method: type, url: url, func: action[type]});
			}
		}
		
	};
	
	var actionType = typeof(action);
	if (actionType === 'function') {
		if (['index', 'new', 'create', 'show', 'edit', 'update', 'destroy'].indexOf(actionName) > -1) {
			forStandarAction();
		} else {
			forCustomAction();
		}
		actionDesc.func = action;
		actionDescs.push(actionDesc);
	} else if (actionType !== 'string' && actionType !== 'number'){
		forDetailedAction();
	}
	
	return actionDescs;
};

var decorateAction = function(actionFunction, viewPath) {
	return function(req, res, next) {
		if (res) {
			var orgRender = res.render;
			res.render = function(viewOrData, data) {
				if (typeof(viewOrData) == 'string') {
					orgRender.call(res, viewOrData, data);
				} else {
					orgRender.call(res, viewPath, viewOrData);
				}					
			};
		}
		return actionFunction(req, res, next);
	};
};


var getDefaultViewPath = function(actionDesc, actionName, controllerName, props) {	
	if (actionDesc.isStandard) {
		if (actionName == 'create') actionName = 'new';
		if (actionName == 'update') actionName = 'edit';
	}
	return controllerName + '/' + actionName + '.' + props.viewSuffix;
};

var processor = exports.processor = function(app, fileName, controller, props) {
	
	var controllerName = fileName.substr(0, fileName.length - 3);
	var actions = controller.actions;
	for(var actionName in actions) {
		var action = actions[actionName];
		var actionDescs = getActionDescs(actionName, action, controllerName, controller, props);
		for (var i = 0; i < actionDescs.length; i++) {
			var actionDesc = actionDescs[i];	
			var viewPath = getDefaultViewPath(actionDesc, actionName, controllerName, props);
			app[actionDesc.method](actionDesc.url, decorateAction(actionDesc.func, viewPath)); // routing is here

		}
	}
};

exports.process = function(app, properties) {
	var prop = properties || {};	

	if (fs.existsSync(prop.controllers)) {
		console.warn('Controllers path: ' + prop.controllers + ' does not exists.');
	}
	prop.viewSuffix = prop.viewSuffix || 'html.ejs';
	
	fs.readdirSync(prop.controllers).forEach(function(file) {
		if (file.substr(-3) == '.js') {
			var controller = require(prop.controllers + '/' + file);
			if (controller.route) {
				controller.route(app);
			}
			if (controller.actions){
				processor(app, file, controller, prop);
			}
		}
	});
};