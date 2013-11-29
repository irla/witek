var witek = require('../lib/witek'),
	expect = require('expect');

var controller = {
	index : function() { }	
};

var mockApp = {
	runs : new Array(),
	get: function(url, funct) {
		this.runs[url] = {method: 'get', funct: funct};
	},
	post: function(url, funct) {
		this.runs[url] = {method: 'post', funct: funct};
	},
	put: function(url, funct) {
		this.runs[url] = {method: 'put', funct: funct};		
	},
	del: function(url, funct) {
		this.runs[url] = {method: 'del', funct: funct};
	},
	clear: function() {
		this.runs = new Array();
	}
};

describe('default functions',function(){

  describe('index method',function(){
    it('should be default controller method  GET /[controller_name]', function(done){
    	witek.processor(mockApp, 'testController.js', {index: function(){}});
    	expect(mockApp.runs['testController']).not.to.be(undefined);
    	var run = mockApp.runs['testController'];
    	expect(run.method).to.be('get');
    	expect(run.funct).to.be.a('function');  
    	mockApp.clear(); 	

    	witek.processor(mockApp, 'testController.js', {nonIndex: function(){}});
    	expect(mockApp.runs['testController']).to.be(undefined);
    	expect(mockApp.runs['testController/nonIndex/:id?']).not.to.be(undefined);
    	run = mockApp.runs['testController/nonIndex/:id?'];
    	expect(run.method).to.be('get');
    	expect(run.funct).to.be.a('function');  
    	mockApp.clear();
    	done();
    });
  });

});
