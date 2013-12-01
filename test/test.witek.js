var request = require('supertest'),
  	express = require('express'),
  	witek = require('../lib/witek'),
	ejslocals = require('ejs-locals');

var app = express();
app.set('views', __dirname + '/fixtures/views');
app.set('view engine', 'ejs');
app.engine('ejs', ejslocals);

witek.process(app, __dirname + '/fixtures/controllers');


describe('Application seceleton', function(){
	describe('Test controller', function(done) {
		it('should implement it\'s test action', function(done){
			request(app)
				.get('/test/test/15')
				.expect(200, '<h1>Test 15</h1>')
				.end(done);
		});
	});
});
