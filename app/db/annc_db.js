// Collection Constants
var anncConst = require('../constants').annc;
var connector = require('./connector');

//--------------- Utility Functions --------------- //

function detailToBrief(anncDetail) {
	var anncBrief = {
		detailId : anncDetail['_id'],

		author : anncDetail['author'],
		title : anncDetail['title'],
		timeStamp : anncDetail['timeStamp'],
		status : anncDetail['status'],

		// filtering properties
		anncTypes : anncDetail['anncTypes'],
		canApply : true,

		// content
		contentBrief : anncDetail['content'],
	};

	return anncBrief;
}

//--------------- Common Operations --------------- //

//schema for anncDetail
function schema() {
	var anncDetail = {
		_id : null,
		briefId : null,

		author : {
			_id : null,
			name : null,
			netId : null,
			profilePic : null
		},
		title : null,
		timeStamp : null,

		// filtering properties
		anncTypes : null,
		interests : [],
		coursesTaken : [],
		degree : 0, // undergraduate, graduate, ...
		overallGPA : 0,
		technicalGPA : 0,
		classStanding : 0,
		resumeRequired : false,

		// contents
		content : null,
		status : 0, // Pending, Open, Expired
		applicants : []
	};

	return anncDetail;
}

/**
 * create announcement db
 * 
 * @param {Object} post
 * @param {Object} callback
 * @return anncDetail doc
 */
exports.create = function(post, callback) {
	// to be implemented
	var anncDetail = schema();

	// schema build up from post data
	anncDetail.author = post.author;
	anncDetail.title = post.title;
	anncDetail.timeStamp = post.timeStamp;
	anncDetail.anncTypes = post.anncTypes;
	anncDetail.interests = [].concat(post.interests);
	anncDetail.coursesTaken = [].concat(post.coursesTaken);
	anncDetail.degree = post.degree;
	anncDetail.overallGPA = post.overallGPA;
	anncDetail.technicalGPA = post.technicalGPA;
	anncDetail.classStanding = post.classStanding;
	anncDetail.resumeRequired = post.resumeRequired;
	anncDetail.content = post.content;
	anncDetail.status = (post.status == null ? 0 : post.status );

	connector.save(anncConst.db.ANNC_DETAILS, anncDetail, function(db, detailDoc) {
		anncDetail = detailDoc;
		var anncBrief = detailToBrief(anncDetail);
		connector.save(anncConst.db.ANNC_BRIEFS, anncBrief, function(db, briefDoc) {
			anncDetail.briefId = briefDoc._id;
			connector.update(anncConst.db.ANNC_DETAILS, { _id : briefDoc.detailId }, anncDetail, function(db, detailDocFinal) {
				db.close();
				callback(anncDetail);
			});
		});
	});
};

/**
 * remove announcement db
 * 
 * @param {Object} _id: detailed _id
 * @param {Object} callback
 * @return {boolean} task_feedback
 */
exports.remove = function(_id, callback) {
	// to be implemented
	connector.remove(anncConst.db.ANNC_BRIEFS, { detailId : _id }, function(db, briefRemoved) {
		if(!briefRemoved) {
			db.close();
			callback(briefRemoved);
			return;
		}
		
		connector.remove(anncConst.db.ANNC_DETAILS, _id, function(db, detailRemoved) {
			db.close();
			callback(detailRemoved);
		});
	});
};

exports.getBriefs = function(callback) {
	connector.findAll(anncConst.db.ANNC_BRIEFS, function(db, docs){
		db.close();
		callback(docs);
	});
};

/**
 * update announcement(detail/brief) db
 * 
 * @param {Object} _id: detailed _id
 *  @param {Object} updateDoc: updated Document
 * @param {Object} callback
 * @return {boolean} task_feedback
 */
exports.updateInfo = function(_id, updateDoc, callback) {
	connector.update(anncConst.db.ANNC_DETAILS, {_id : _id}, updateDoc, function(db, detailDoc){
		var briefId = detailDoc.briefId;
		var briefDoc = detailToBrief(detailDoc);
		connector.update(anncConst.db.ANNC_BRIEFS, {_id : briefId}, briefDoc, function(db, resultBrief){
			db.close();
			callback(briefDoc != null);
		});
	});
};
// --------------- Object Specific Operations --------------- //

/**
 * @param {Object} callback
 * @return {boolean} brief doc
 */
exports.getAnncBriefByStatus = function(status, order, callback) {
	connector.findAllwithConditionByOrder(anncConst.db.ANNC_BRIEFS, { status: status }, { timeStamp : -1 }, function(db, resultDoc){
		db.close();
		callback(resultDoc);
	});
};

/**
 * @param {Object} _id: brief Id
 * @param {Object} callback
 * @return {boolean} brief doc
 */
exports.getBrief = function(detailed_id, callback) {
	connector.findOne(anncConst.db.ANNC_BRIEFS, {detailId: detailed_id}, function(db, resultDoc){
		db.close();
		callback(resultDoc);
	});
};

/**
 * @param {Object} callback
 * @return {boolean} brief doc
 */
exports.getAnncDetailByStatus = function(status, order, callback) {
	connector.findAllwithConditionByOrder(anncConst.db.ANNC_DETAILS, { status: status }, { timeStamp : order }, function(db, resultDoc){
		db.close();
		callback(resultDoc);
	});
};

/**
 * @param {Object} _id: brief Id
 * @param {Object} callback
 * @return {boolean} brief doc
 */
exports.getDetail = function(_id, callback) {
	connector.findOne(anncConst.db.ANNC_DETAILS, {_id: _id}, function(db, resultDoc){
		db.close();
		callback(resultDoc);
	});
};


/**
 * @param user Detail Object
 */
exports.followingAnnRecSystem = function(user, callback) {
	var friendList = user.followings;
	var cond = 
		[
	            {
	            	$match :{  
	            		$and: [
	      	        	          {"author._id" : { $in : friendList }},
	    	        	          {"status" : {$eq : 1}}
	    	        	   ]
	      	        }
	            },
	            {
	                $sort : { timestamp : -1 }
	            }
	    ];
	
	connector.aggreate(anncConst.db.ANNC_BRIEFS, cond, function(db, result) {
		db.close();
		callback(result);
	});
};


/**
 * @param user Detail Object
 */
exports.AnnRecSystem = function(user, callback) {
	var id = user._id,
		interests = (user.interests == null ? [] : user.interests),
		coursesTaken = (user.coursesTaken == null ? [] : user.coursesTaken),
		overallGPA = user.overallGPA,
		technicalGPA = user.technicalGPA,
		classStanding = user.classStanding,
		degree = user.degree;
	
	var cond = 
		[
	       {
	           $match : {
	        	   $and: [
	        	          {"author._id" : {$ne : id }},
	        	          {"status" : {$eq : 1}}
	        	   ]
	           }
	       },
	       {
	           $project : 
	           {
	               author : 1,
	               title : 1,
	               timeStamp : 1,
	               anncTypes : 1,
	               interests : 1,
	               content : 1,
	               status : 1, 
	               rank : 
	               {
	                   $add : 
	                   [
	                       { $size : {$setIntersection : [ "$interests", interests ]}},
	                       { $size : {$setIntersection : [ "$coursesTaken", coursesTaken ]}}
	                   ]
	               },
	               appliable : 
	               {
	                   $cond : 
	                   [
		                   { 
		                       $and : 
		                       [
		                           {$lte : [ "$overallGPA", overallGPA ]},
		                           {$lte : [ "$technialGPA", technicalGPA ]},
		                           {$lte : [ "$classStanding", classStanding ]},
		                           {$lte : [ "$degree", degree ]}
		                       ]
		                   }, 1, 0
	                   ]
	               }
	           }
	       },
	       {
	           $sort : { timestamp: -1, rank : -1 }
	       }
	    ];
	
	connector.aggreate(anncConst.db.ANNC_DETAILS, cond, function(db, result) {
		db.close();
		callback(result);
	});
};