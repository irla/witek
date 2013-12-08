var request = require('supertest'),
  	express = require('express'),
  	witek = require('..'),
	ejslocals = require('ejs-locals');

var app = express();
app.set('views', __dirname + '/fixtures/views');
app.set('view engine', 'ejs');
app.engine('ejs', ejslocals);

//this should be fired on the end of app run
witek.controllers(app, {
	controllers: __dirname + '/fixtures/controllers',
	viewSuffix: 'html.ejs'
});

console.log('----');
console.log(app.settings.env);
console.log('----');


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
	describe('Base url controller with detailed and standard actions', function(){
		it('Index method points to base url/controller name', function(done){
			request(app)
			.get('/albums/41/photos')
			.expect(200, '<h1>Base Url Index. Parent Id: 41</h1>')
			.end(done);
		});
		it('custom method point to base url/controller name/custom/:id?', function(done){
			request(app)
			.get('/albums/41/photos/custom/44')
			.expect(200, '<h1>Custom action in photo, Album Id: 41, Id: 44</h1>')
			.end(done);
		});
		it('detailed get method should be handled', function(done){
			request(app)
			.get('/albums/41/photos/detailed/45')
			.expect(200, '<h1>Detailed Get Action, Album Id: 41, Id: 45</h1>')
			.end(done);
		});
		it('detailed post method should be handled', function(done){
			request(app)
			.post('/albums/41/photos/detailed/46')
			.expect(200, '<h1>Detailed Post Action, Album Id: 41, Id: 46</h1>')
			.end(done);
		});
		it('detailed put with relative url should be handled', function(done){
			request(app)
			.put('/albums/41/photos/relativePath/47')
			.expect(200, '<h1>Detailed Relative Url Put, Album Id: 41, Id: 47</h1>')
			.end(done);
		});
		it('detailed delete with relative url should be handled', function(done){
			request(app)
			.del('/albums/41/photos/relativePath/48')
			.expect(200, '<h1>Detailed Relative Url Delete, Album Id: 41, Id: 48</h1>')
			.end(done);
		});
		it('detailed get with absolute url should be handled', function(done){
			request(app)
			.get('/absolutePath/49')
			.expect(200, '<h1>Detailed Absolute Url Get, Album Id: None, Id: 49</h1>')
			.end(done);
		});
		it('detailed post with absolute url should be handled', function(done){
			request(app)
			.post('/absolutePath/50')
			.expect(200, '<h1>Detailed Absolute Url Post, Album Id: None, Id: 50</h1>')
			.end(done);
		});
	});
});
