/*
 * GET (non-view) resources
 */

var session = require('../session');

exports.sample = function(req, res){
	res.send("Hello World!");
};