var app = require(__dirname + '/fixtures/full_app/app').app,
	request = require('supertest');

describe('Full app application', function(){
	describe('Welcome controller', function() {
		it('should implement it\'s index action for base path', function(done){
			request(app)
				.get('/')
				.expect(200, 'Welcome page')
				.end(done);
		});
	});
	describe('Albums controller', function(){
		it('should implement it\'s index action', function(done){
			request(app)
				.get('/albums')
				.expect(200, 'Albums index')
				.end(done);
		});
		it('should implement it\'s new action', function(done){
			request(app)
				.get('/albums/new')
				.expect(200, 'Albums new')
				.end(done);
		});
		it('should implement it\'s create action', function(done){
			request(app)
				.post('/albums')  // this is default REST style adding
				.expect(200, 'Albums create')
				.end(done);
		});
		it('should implement it\'s edit action', function(done){
			request(app)
				.get('/albums/15/edit')
				.expect(200, 'Albums edit:15')
				.end(done);
		});
	});
});
