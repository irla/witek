var witek = require('../lib/witek'),
	expect = require('expect.js');

var controller = {
	index : function() { }	
};

var mockApp = {
	gets : [],	posts: [],	puts: [],	dels: [],
	get: function(url, funct)  { this.gets[url] = funct;},
	post: function(url, funct) { this.posts[url] = funct;},
	put: function(url, funct)  { this.puts[url] = funct;},
	del: function(url, funct)  { this.dels[url] = funct;},
	clear: function() {
		this.gets = [];
		this.posts = [];
		this.puts = [];
		this.dels = [];
	}
};


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
	  restMethodsController.baseUrl = 'testing/:parentId';
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

});
