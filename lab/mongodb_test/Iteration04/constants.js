/**
 * New node file
 */

exports.db = {
	CONNECTION_STRING : 'mongodb://127.0.0.1:27017/weconnect',
	//CONNECTION_STRING : 'mongodb://hay.synology.me:27017/weconnect',
};

exports.interests = [
	'Software Engineering', 'Data Mining', 'Machine Learning', 'Algorithm',
	'Graphics', 'Multimedia', 'Aritificial Intelligence', 'Database', 'User Inteface',
	'Web Development', 'System Programming', 'Network', 'Security'
];

exports.departments = [
	'CS', 'ECE', 'EE', 'PHYS', 'MATH', 'CHEM',
];

exports.degrees = [
	'Bachelor\'s', 'Master', 'Ph.D.', 'Post Doctoral',
];

exports.classStandings = [
	'Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate',
];

exports.user = {
	TYPE_STUDENT	: 'student',
	TYPE_FACULTY	: 'faculty',
	
	db : {
		USER_DETAILS	: 'userDetails',
		USER_BRIEFS		: 'userBriefs',
		USER_ACCOUNTS	: 'userAccounts',
	},
};