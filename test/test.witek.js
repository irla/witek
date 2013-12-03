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
	describe('Test controller', function() {
		it('should implement it\'s test action', function(done){
			request(app)
				.get('/test/test/15')
				.expect(200, '<h1>Test 15</h1>')
				.end(done);
		});
	});
	describe('Rest like controller - no base url', function(){
		it('should implment rest style "index" method', function(done){
			request(app)
				.get('/restLike')
				.expect(200, '<h1>Rest Like Index</h1>')
				.end(done);
		});
		it('should implment rest style "new" method', function(done){
			request(app)
				.get('/restLike/new')
				.expect(200, '<h1>Rest Like New</h1>')
				.end(done);
		});
		it('should implment rest style "create" method', function(done){
			request(app)
				.post('/restLike')
				.expect(200, '<h1>Rest Like Create</h1>')
				.end(done);
		});
		it('should implment rest style "show" method', function(done){
			request(app)
				.get('/restLike/41')
				.expect(200, '<h1>Rest Like Show: 41</h1>')
				.end(done);
		});
		it('should implment rest style "edit" method', function(done){
			request(app)
				.get('/restLike/41/edit')
				.expect(200, '<h1>Rest Like Edit: 41</h1>')
				.end(done);
		});
		it('should implment rest style "update" method', function(done){
			request(app)
				.put('/restLike/41')
				.expect(200, '<h1>Rest Like Update: 41</h1>')
				.end(done);
		});
		it('should implment rest style "destroy" method', function(done){
			request(app)
				.del('/restLike/41')
				.expect(200, 'Destroyed')
				.end(done);
		});
	});
});
