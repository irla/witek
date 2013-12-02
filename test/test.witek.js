var request = require('supertest'),
  	express = require('express'),
  	witek = require('../lib/witek'),
	ejslocals = require('ejs-locals');

var app = express();
app.set('views', __dirname + '/fixtures/views');
app.set('view engine', 'ejs');
app.engine('ejs', ejslocals);

witek.process(app, __dirname + '/fixtures/controllers');


<<<<<<< HEAD
describe('Processing controller',function(){
	var restMethodsController = {
		index: function(){return 'index';}, // standard listing method
		'new': function(){return 'new';}, // standard create new pre method
		create: function(){return 'create';},// standard function for creating bussines
		show: function(){return 'show';},  // standard function for showing
		edit: function(){return 'edit';},  // standard function for pre edit
		update: function(){return 'update';},// standard function for edit bussines
		destroy: function(){return 'destroy';}// standard deleting method
	};
	
  describe('standard REST methods, no base url controller',function(){
	  mockApp.clear();
	  witek.processor(mockApp, 'standardRest.js', restMethodsController);
	  var gets = mockApp.gets;
	  var posts = mockApp.posts;
	  var puts = mockApp.puts;
	  var dels = mockApp.dels;
	  
	  it('should create standar listing method GET /[controller_name]', function(done){
		  var func = gets['/standardRest'];
		  expect(func).not.to.be(undefined);
		  expect(func).to.be.a('function');
		  expect(func()).to.be('index');
		  done();
	  });
	  
	  it('should create standar pre create method GET /[controller_name]/new', function(done){
		  var func = gets['/standardRest/new'];
		  expect(func).not.to.be(undefined);
		  expect(func).to.be.a('function');
		  expect(func()).to.be('new');
		  done();
	  });
	  
	  it('should create standar create method POST /[controller_name]', function(done){
		  var func = posts['/standardRest'];
		  expect(func).not.to.be(undefined);
		  expect(func).to.be.a('function');
		  expect(func()).to.be('create'); 
		  done();
	  });
	  
	  it('should create standar show method GET /[controller_name]/:id', function(done){
		  var func = gets['/standardRest/:id'];
		  expect(func).not.to.be(undefined);
		  expect(func).to.be.a('function');
		  expect(func()).to.be('show'); 
		  done();
	  });
	  
	  it('should create standar pre update method GET /[controller_name]/:id/edit', function(done){
		  var func = gets['/standardRest/:id/edit'];
		  expect(func).not.to.be(undefined);
		  expect(func).to.be.a('function');
		  expect(func()).to.be('edit'); 
		  done();
	  });
	  
	  it('should create standar update method PUT /[controller_name]/:id', function(done){
		  var func = puts['/standardRest/:id'];
		  expect(func).not.to.be(undefined);
		  expect(func).to.be.a('function');
		  expect(func()).to.be('update'); 
		  done();
	  });
	  
	  it('should create standar destroy method DELETE /[controller_name]/:id', function(done){
		  var func = dels['/standardRest/:id'];
		  expect(func).not.to.be(undefined);
		  expect(func).to.be.a('function');
		  expect(func()).to.be('destroy'); 
		  done();
	  });
  });
	
  describe('standard REST methods, with base url /testing/:parentId',function(){
	  mockApp.clear();
	  restMethodsController.baseUrl = '/testing/:parentId';
	  witek.processor(mockApp, 'standardRest.js', restMethodsController);
	  delete restMethodsController;
	  var gets = mockApp.gets;
	  var posts = mockApp.posts;
	  var puts = mockApp.puts;
	  var dels = mockApp.dels;
	  
	  it('should create standar listing method GET [baseUrl]/[controller_name]', function(done){
		  var func = gets['/testing/:parentId/standardRest'];
		  expect(func).not.to.be(undefined);
		  expect(func).to.be.a('function');
		  expect(func()).to.be('index');
		  done();
	  });
	  
	  it('should create standar pre create method GET [baseUrl]/[controller_name]/new', function(done){
		  var func = gets['/testing/:parentId/standardRest/new'];
		  expect(func).not.to.be(undefined);
		  expect(func).to.be.a('function');
		  expect(func()).to.be('new');
		  done();
	  });
	  
	  it('should create standar create method POST [baseUrl]/[controller_name]', function(done){
		  var func = posts['/testing/:parentId/standardRest'];
		  expect(func).not.to.be(undefined);
		  expect(func).to.be.a('function');
		  expect(func()).to.be('create'); 
		  done();
	  });
	  
	  it('should create standar show method GET [baseUrl]/[controller_name]/:id', function(done){
		  var func = gets['/testing/:parentId/standardRest/:id'];
		  expect(func).not.to.be(undefined);
		  expect(func).to.be.a('function');
		  expect(func()).to.be('show'); 
		  done();
	  });
	  
	  it('should create standar pre update method GET [baseUrl]/[controller_name]/:id/edit', function(done){
		  var func = gets['/testing/:parentId/standardRest/:id/edit'];
		  expect(func).not.to.be(undefined);
		  expect(func).to.be.a('function');
		  expect(func()).to.be('edit'); 
		  done();
	  });
	  
	  it('should create standar update method PUT [baseUrl]/[controller_name]/:id', function(done){
		  var func = puts['/testing/:parentId/standardRest/:id'];
		  expect(func).not.to.be(undefined);
		  expect(func).to.be.a('function');
		  expect(func()).to.be('update'); 
		  done();
	  });
	  
	  it('should create standar destroy method DELETE [baseUrl]/[controller_name]/:id', function(done){
		  var func = dels['/testing/:parentId/standardRest/:id'];
		  expect(func).not.to.be(undefined);
		  expect(func).to.be.a('function');
		  expect(func()).to.be('destroy'); 
		  done();
	  });
  });
  
  describe('base url does not need to have "/" provided',function(){
	  mockApp.clear();
	  restMethodsController.baseUrl = 'testing/:parentId';
	  witek.processor(mockApp, 'standardRest.js', restMethodsController);
	  delete restMethodsController;
	  var gets = mockApp.gets;
	  it('should create standar listing method GET [baseUrl]/[controller_name]', function(done){
		  var func = gets['/testing/:parentId/standardRest'];
		  expect(func).not.to.be(undefined);
		  expect(func).to.be.a('function');
		  expect(func()).to.be('index');
		  done();
	  });
  });
  
  describe('non standard rest functions maps to GET /[controllerName]/[functionName]/:id?', function(){
	  it('should create method GET /[controllerName]/[nonStandardAction]/:id?', function(done){
		  mockApp.clear();
		  witek.processor(mockApp, 'nonStandardController.js', {nonStandardAction: function(){return 'NonStandard';}});
		  var gets = mockApp.gets;
		  var func = gets['/nonStandardController/nonStandardAction/:id?'];
		  expect(func).not.to.be(undefined);
		  expect(func).to.be.a('function');
		  expect(func()).to.be('NonStandard');
		  done();
	  });
	  it('should create method GET /[baseUrl]/[controllerName]/[nonStandardAction]/:id?', function(done){
		  mockApp.clear();
		  witek.processor(mockApp, 'nonStandardController.js', {baseUrl: 'base/:parentId', nonStandardAction: function(){return 'BaseNonStandard';}});
		  var gets = mockApp.gets;
		  var func = gets['/base/:parentId/nonStandardController/nonStandardAction/:id?'];
		  expect(func).not.to.be(undefined);
		  expect(func).to.be.a('function');
		  expect(func()).to.be('BaseNonStandard');
		  done();
	  });
  });
  
  describe('detailed actions description (subprojects)', function(){
	  it('detailed action without url and whiout baseUrl', function(){
		  var testController = {
			  detailedAction : {
				  get: function() {return 'getFunc';},
				  post: function() {return 'postFunc';},
				  put: function() {return 'putFunc';},
				  del: function() {return 'delFunc';}
			  }
		  };
		  witek.processor(mockApp, 'detailedController.js', testController);
		  var func = mockApp.gets['/detailedController/detailedAction/:id?'];
		  expect(func).not.to.be(undefined);
		  expect(func).to.be.a('function');
		  expect(func()).to.be('getFunc');		  

		  func = mockApp.posts['/detailedController/detailedAction/:id?'];
		  expect(func).not.to.be(undefined);
		  expect(func).to.be.a('function');
		  expect(func()).to.be('postFunc');

		  func = mockApp.puts['/detailedController/detailedAction/:id?'];
		  expect(func).not.to.be(undefined);
		  expect(func).to.be.a('function');
		  expect(func()).to.be('putFunc');

		  func = mockApp.dels['/detailedController/detailedAction/:id?'];
		  expect(func).not.to.be(undefined);
		  expect(func).to.be.a('function');
		  expect(func()).to.be('delFunc');
	  });	  
  
	  it('detailed action with baseUrl and relative/path', function(){
		  var testController = {
			  baseUrl: 'base',
			  detailedAction : {
				  url: 'relative/path', // no '/' on the begining
				  get: function() {return 'getFunc';},
				  post: function() {return 'postFunc';},
				  put: function() {return 'putFunc';},
				  del: function() {return 'delFunc';}
			  }
		  };
		  witek.processor(mockApp, 'detailedController.js', testController);
		  var func = mockApp.gets['/base/detailedController/relative/path'];
		  expect(func).not.to.be(undefined);
		  expect(func).to.be.a('function');
		  expect(func()).to.be('getFunc');		  

		  func = mockApp.posts['/base/detailedController/relative/path'];
		  expect(func).not.to.be(undefined);
		  expect(func).to.be.a('function');
		  expect(func()).to.be('postFunc');

		  func = mockApp.puts['/base/detailedController/relative/path'];
		  expect(func).not.to.be(undefined);
		  expect(func).to.be.a('function');
		  expect(func()).to.be('putFunc');

		  func = mockApp.dels['/base/detailedController/relative/path'];
		  expect(func).not.to.be(undefined);
		  expect(func).to.be.a('function');
		  expect(func()).to.be('delFunc');
	  });
  
	  it('detailed action with baseUrl and /absolute/path', function(){
		  var testController = {
			  baseUrl: 'base',
			  detailedAction : {
				  url: '/absolute/path/:id?', // '/' on the begining, controller name and baseUrl are not important
				  get: function() {return 'getFunc';},
				  post: function() {return 'postFunc';},
				  put: function() {return 'putFunc';},
				  del: function() {return 'delFunc';}
			  }
		  };
		  witek.processor(mockApp, 'detailedController.js', testController);
		  var func = mockApp.gets['/absolute/path/:id?'];
		  expect(func).not.to.be(undefined);
		  expect(func).to.be.a('function');
		  expect(func()).to.be('getFunc');		  

		  func = mockApp.posts['/absolute/path/:id?'];
		  expect(func).not.to.be(undefined);
		  expect(func).to.be.a('function');
		  expect(func()).to.be('postFunc');

		  func = mockApp.puts['/absolute/path/:id?'];
		  expect(func).not.to.be(undefined);
		  expect(func).to.be.a('function');
		  expect(func()).to.be('putFunc');

		  func = mockApp.dels['/absolute/path/:id?'];
		  expect(func).not.to.be(undefined);
		  expect(func).to.be.a('function');
		  expect(func()).to.be('delFunc');
	  });
	  
  });

=======
describe('Application seceleton', function(){
	describe('Test controller', function(done) {
		it('should implement it\'s test action', function(done){
			request(app)
				.get('/test/test/15')
				.expect(200, '<h1>Test 15</h1>')
				.end(done);
		});
	});
>>>>>>> 72d69655511bb9dd7d56ad19bc47f17c54225640
});
