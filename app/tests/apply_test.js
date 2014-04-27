var assert = require('assert');
var anncControl = require('../controls/annc_control');

describe("#sendMail(receiver, subject, text)", function() {
	this.timeout(0);
	
	before(function(done) {
		anncControl.sendMail(
			'jinmoku1@gmail.com',
			'Hello?',
			'How are you my friend?',
			'<h1>Hello HTML version</h1><p>Checking if text will be gone?</p><p><a href="www.bing.com">www.bing.com</a></p>',
			function() {
			done();
		});
	});
	
	it("sendMail complete", function() {
		
	});
});