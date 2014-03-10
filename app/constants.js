/**
 * New node file
 */

exports.db = {
	CONNECTION_STRING : 'mongodb://127.0.0.1:27017/weconnect',
	//CONNECTION_STRING = 'mongodb://hay.synology.me:27017/weconnect',
};

exports.user = {
	TYPE_STUDENT	: 'student',
	TYPE_FACULTY	: 'faculty',
	
	classStanding 	: {
		FRESHMAN		: 'Freshman',
		SOPHOMORE		: 'Sophomore',
		JUNIOR			: 'Junior',
		SENIOR			: 'Senior',
	},
	
	degree			: {
		UNDERGRADUATE	: 'Undergraduate',
		GRADUATE		: 'Graduate',
		PHD				: 'Ph.D.',
		POST_DOCTORAL	: 'Post Doctoral',
	},
	
	db : {
		USER_DETAILS	: 'userDetails',
		USER_BRIEFS		: 'userBriefs',
		USER_ACCOUNTS	: 'userAccounts',
	},
};