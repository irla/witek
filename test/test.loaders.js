var request = require('supertest'),
  	witek = require('..'),
	expect = require('expect.js');

var app = {
	enablings: [],
	enable: function(what) {this.enablings.push(what);},
	clear: function(){this.enablings = [];}
};


describe('Config files boot order', function(){
	var testForEnvironment = function(env, done) {
		app.clear();
		app.settings = {env: env};
		witek.load(app, __dirname + '/fixtures/loader_app/config');
		expect(app.enablings).to.be.an('array');
		expect(app.enablings).to.have.length(5);
		expect(app.enablings[0]).to.be(env);
		expect(app.enablings[1]).to.be('all');
		expect(app.enablings[2]).to.be('first');
		expect(app.enablings[3]).to.be('some_in_middle');
		expect(app.enablings[4]).to.be('let_say_this_is_last');
		done();
	};
	describe('For different environments', function() {		
		it('should load files in correct orders for development environment', function(done){
			testForEnvironment('development', done);
		});
		it('should load files in correct orders for production environment', function(done){
			testForEnvironment('production', done);
		});
		it('should load files in correct orders for stage environment', function(done){
			testForEnvironment('stage', done);
		});
	});
});
