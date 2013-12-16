var app = require('express')();
	witek = require('../../..');

witek.load(app, __dirname + '/config');
console.log('app starts');

exports.app = app; // I'm returning it only for tests