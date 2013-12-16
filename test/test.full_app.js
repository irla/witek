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
	describe('Photos controller', function(){
		it('should implement it\'s index action', function(done){
			request(app)
				.get('/albums/16/photos')
				.expect(200, 'Photos index:16')
				.end(done);
		});
		it('should implement it\'s new action', function(done){
			request(app)
				.get('/albums/17/photos/new')
				.expect(200, 'Photos new:17')
				.end(done);
		});
		it('should implement it\'s create action', function(done){
			request(app)
				.post('/albums/18/photos')
				.expect(200, 'Photos create:18')
				.end(done);
		});
		it('should implement it\'s edit action', function(done){
			request(app)
				.get('/albums/19/photos/20/edit')
				.expect(200, 'Photos edit:19:20')
				.end(done);
		});
		it('should implement it\'s doSomething action', function(done){
			request(app)
				.get('/albums/21/photos/doSomething/22')
				.expect(200, 'Do something:21:22')
				.end(done);
		});
		it('should implement it\'s store get action', function(done){
			request(app)
				.get('/photos/store/23')
				.expect(200, 'Photos store get:None:23')
				.end(done);
		});
		it('should implement it\'s store post action', function(done){
			request(app)
				.post('/photos/store/24')
				.expect(200, 'Photos store post:None:24')
				.end(done);
		});
		it('should not implement it\'s store delete action', function(done){
			request(app)
				.del('/photos/store/24')
				.expect(404)
				.end(done);
		});
	});
});
