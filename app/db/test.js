/**
 * New node file
 */

var anncDb = require('./annc_db');
var userDb = require('./user_db');
var constant = require('../constants').annc;

/*
var post = {
    author  : {
        _id     : Object(),
        name    : "Seungchul",
        netId   : "slee",
        profilePic	: "www.haha.com"
    },
    title       : "Title of Announcement",
    timeStamp   : "13232342342",
    anncTypes : [ 0 ],
    interests  : [
        {
           name : "Data Mining",
        }
    ],
    coursesTaken    : [
        {
            name    : "Database System",
            grade   : "A"
        }
    ],
    degree          : 0,
    overallGPA      : 3.0,
    technicalGPA    : 2.0,
    classStanding   : 3,
    resumeRequired  : false,
    content        : "I need you",
    status : 0,
    applicants      : [
        {
            _id : Object(),
            name : "Seungchul Lee",
            message : "RSVP date, or something",
        }
    ]
};

anncDb.create(post, function(detailDocFinal) {
	if (detailDocFinal) {
		console.log('creating success');
		anncDb.getBriefs(function(briefDocs) {
			console.log("brief Doc: " + briefDocs);
			anncDb.getDetail(detailDocFinal._id, function(findDetail) {
				//console.log(findDetail);
				findDetail.title = "New title";
				anncDb.updateInfo(findDetail._id, findDetail, function(result) {
					console.log("result: " + result);
					anncDb.getBrief(findDetail._id, function(resultDoc) {
						console.log('getBrief: ' + resultDoc.netId);
						anncDb.remove(detailDocFinal._id, function(detailRemoved) {
							if (detailRemoved) {
								console.log('removing success');

							}
						});
					});
				});
			});
		});
	}
	else {
		var error = "[ERROR] Your password is incorrect.";
		console.log(error);
	}
});
*/

//anncDb.getBriefs(function(allDocs) {
//	console.log(allDocs);
//});
//
//anncDb.getAnncBriefByStatus(constant.PENDING, constant.DECREASING, function(briefPendingDoc) {
//	console.log("getPendingBrief: " + briefPendingDoc[0].timeStamp + ", " + briefPendingDoc[1].timeStamp);
//});


userDb.recSys("slee1", function(result) {
	
});