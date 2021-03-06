/**
 * You must have installed mocha in global level, use follower commands to do so:
 * 
 * 	sudo npm install -g mocha
 * 
 * Then you can run the test with follower command:
 * 
 * 	mocha tests/sample.js
 * 
 */

// run automated tests for userDb module
require('./user_db_test');

// run automated tests for anncDb module
require('./annc_db_test');