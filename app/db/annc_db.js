/**
 * A module for Anncouncement DB.
 * @module db/anncDb
 *
 * @requires module:db/connector
 * @requires module:contants
 */

// Collection Constants
var userConst = require('../constants').user;
var anncConst = require('../constants').annc;
var connector = require('./connector');


/**
 * Struct Announcement Brief DB schema from Announcement Detail DB schema
 *
 * @access private
 * @param {Object} anncouncement detail object
 */
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

/**
 * Struct Announcement Detail DB schema
 *
 * @access private
 */
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
 * create announcement in db
 * 
 * @param {Object} post
 * @param {db/anncDb~createCallback} Callback function
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
 * This callback is displayed as part of the AnncDb module.
 *
 * @callback db/anncDb~createCallback
 * @param {Object} announcement detail object
 */

/**
 * remove announcement from db
 * 
 * @param {ObjectId} announcement detail id
 * @param {db/anncDb~removeCallback} Callback function
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
/**
 * This callback is displayed as part of the AnncDb module.
 *
 * @callback db/anncDb~removeCallback
 * @param {Boolean} check whetehr removing is successfully done
 */

/**
 * This function remove all bookmarks related given announcement Id
 * @param {string} collection name
 * @param {ObjectId} anncoundment detail Id
 * @param {db/anncDb~removeAllBookmarksCallback} Callback function
 */
exports.removeAllBookmarks = function(anncId, callback){
	var queryStatement = {"bookmarkedAnncs" : { $elemMatch : {"detailId" : anncId}}};
	connector.updateAll(userConst.db.USER_DETAILS, queryStatement, {'$pull': {"bookmarkedAnncs": {"detailId" :anncId}}}, function(db, result){
		db.close();
		callback(result);
	});
};
/**
 * This callback is displayed as part of the AnncDb module.
 *
 * @callback db/anncDb~removeAllBookmarksCallback
 * @param {List<Object>} brief announcement objects list
 */

/**
 * This function returns brief announcement list
 *
 * @param {db/anncDb~getBriefsCallback} Callback function
 */
exports.getBriefs = function(callback) {
	connector.findAll(anncConst.db.ANNC_BRIEFS, function(db, docs){
		db.close();
		callback(docs);
	});
};
/**
 * This callback is displayed as part of the AnncDb module.
 *
 * @callback db/anncDb~getBriefsCallback
 * @param {List<Object>} brief announcement objects list
 */

/**
 * update announcement(detail/brief) db
 * 
 * @param {ObjectId} announcement detail object Id
 * @param {Object} update Document object
 * @param {db/anncDb~updateInfoCallback} Callback function
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
/**
 * This callback is displayed as part of the AnncDb module.
 *
 * @callback db/anncDb~updateInfoCallback
 * @param {Boolean} check updated is successful or not.
 */

/**
 * This function returns that brief announcement list with given order and status
 *
 * @param {Number} Status of announcement
 * @param {Number} Order of announcement on posted time
 * @param {db/anncDb~getAnncBriefByStatusCallback} Callback function with list of brief announcement objects with given order and status
 */
exports.getAnncBriefByStatus = function(status, order, callback) {
	connector.findAllwithConditionByOrder(anncConst.db.ANNC_BRIEFS, { status: status }, { timeStamp : order }, function(db, resultDoc){
		db.close();
		callback(resultDoc);
	});
};
/**
 * This callback is displayed as part of the AnncDb module.
 *
 * @callback db/anncDb~getAnncBriefByStatusCallback
 * @param {List<Object>} list of brief announcement objects with given order and status
 */

/**
 * This function returns brief announcement list
 *
 * @param {ObjectId} detail announcement object Id
 * @param {db/anncDb~getBriefCallback} Callback function with brief announcement object with given detail Object Id
 */
exports.getBrief = function(detailed_id, callback) {
	connector.findOne(anncConst.db.ANNC_BRIEFS, {detailId: detailed_id}, function(db, resultDoc){
		db.close();
		callback(resultDoc);
	});
};
/**
 * This callback is displayed as part of the AnncDb module.
 *
 * @callback db/anncDb~getBriefCallback
 * @param {Object} brief announcement object
 */

/**
 * This function returns announcement detail list with given status and order
 *
 * @param {Number} Status of announcement
 * @param {Number} Order of announcement on posted time
 * @param {db/anncDb~getAnncDetailByStatusCallback} Callback function with list of filtered announcement detail with given order
 */
exports.getAnncDetailByStatus = function(status, order, callback) {
	connector.findAllwithConditionByOrder(anncConst.db.ANNC_DETAILS, { status: status }, { timeStamp : order }, function(db, resultDoc){
		db.close();
		callback(resultDoc);
	});
};
/**
 * This callback is displayed as part of the AnncDb module.
 *
 * @callback db/anncDb~getAnncDetailByStatusCallback
 * @param {List<Object>} list of announcement's detail objects that is filtered by status value with gvein order
 */

/**
 * Get Announcemet Detail information from db
 *
 * @param {ObjectId} Brief Announcement Id
 * @param {db/anncDb~getDetailCallback} Callback function with announcement detail information
 */
exports.getDetail = function(_id, callback) {
	connector.findOne(anncConst.db.ANNC_DETAILS, {_id: _id}, function(db, resultDoc){
		db.close();
		callback(resultDoc);
	});
};
/**
 * This callback is displayed as part of the AnncDb module.
 *
 * @callback db/anncDb~getDetailCallback
 * @param {Object} odbject of announcement's detail
 */


/**
 * This method is for score-based announcement recommendation system (filtering out for following users).
 * 
 * @param {Object} Detail Object
 * @param {db/anncDb~followingAnnRecSystemCallback} Callback function with recommended announcements
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
 * This callback is displayed as part of the AnncDb module.
 *
 * @callback db/anncDb~followingAnnRecSystemCallback
 * @param {List<Object>} recommended announcements' list
 */


/**
 * This method is for score-based announcement recommendation system (for all announcement).
 * 
 * @param {Object} Detail Object
 * @param {db/anncDb~AnnRecSystemCallback} Callback function with recommended announcements
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
	/**
	 * This callback is displayed as part of the AnncDb module.
	 *
	 * @callback db/anncDb~AnnRecSystemCallback
	 * @param {List<Object>} recommended announcements' list
	 */
};