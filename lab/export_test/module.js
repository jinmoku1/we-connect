/**
 * New node file
 */

//var somevar;
//var num;

exports.foo = function(something) {
	this.somevar = 'helldfdfdfo';
	this.num = 5;
	console.log("foo called.");
	console.log(this.somevar);
	console.log(this.num);
};

exports.updateVar = function() {
	somevar = 'hello';
};

exports.updateNum = function() {
	num = 10;
};

function printNumber() {
	console.log(num);
};