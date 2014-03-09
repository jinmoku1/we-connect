// Collection Constants
var ANNC_DETAILS	= 'anncDetails';
var ANNC_BRIEFS		= 'anncBriefs';

var connector = require('./connector');

//--------------- Utility Functions --------------- //

function detailToBrief(anncDetail) {
	return {
		detailId : anncDetail['_id'],
	};
}

//--------------- Common Operations --------------- //

exports.create = function(anncDetail, callback) {
	// to be implemented
};

exports.remove = function(_id, callback) {
	// to be implemented
};

exports.getBriefs = function(callback) {
	// to be implemented
};

exports.getDetail = function(_id, callback) {
	// to be implemented
};

// --------------- Object Specific Operations --------------- //

