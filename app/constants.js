/**
 * A module for keeping all constants used throughout the application.
 * @module constants
 */

/**
 * Enum for DB connection url.
 * @readonly
 * @enum {string}
 */
exports.db = {
	CONNECTION_STRING : 'mongodb://localhost:27017/weconnect',
};

/**
 * A constant for the list of interests.
 * @type {array}
 */
exports.interests = [
	'Software Engineering', 'Data Mining', 'Machine Learning', 'Algorithm',
	'Graphics', 'Multimedia', 'Artificial Intelligence', 'Database', 'User Inteface',
	'Web Development', 'System Programming', 'Network', 'Security',
];

/**
 * A constant for the list of departments.
 * @type {array}
 */
exports.departments = [
	'CS', 'ECE', 'EE', 'PHYS', 'MATH', 'CHEM',
];

/**
 * A constant for the list of courses.
 * @type {array}
 */
exports.courses = [
	'CS411 Database Systems', 'CS438 Communication Networks', 'CS440 Artificial Intelligence',
	'CS428 Software Engineering', 'CS210 Ethics in Computer Science', 'CS423 Operating Systems Design',
	'CS465 User Interface Design', 'CS241 System Programming', 'CS242 Programming Studio',
	'CS431 Embedded Systems', 'CS425 Distributed System', 'ECE391 Computer Systems Engineering',
	'PHYS214 Univ. Physics: Quantum Physics',
];

/**
 * A constant for the list of degrees.
 * @type {array}
 */
exports.degrees = [
	'Bachelor\'s', 'Master', 'Ph.D.', 'Post Doctoral',
];

/**
 * A constant for the list of class standings.
 * @type {array}
 */
exports.classStandings = [
	'Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate',
];

/**
 * Enum for user types.
 * @readonly
 * @enum {string}
 */
exports.user = {
	TYPE_STUDENT	: 'student',
	TYPE_FACULTY	: 'faculty',
	TYPE_ADMIN		: 'admin',
	
	db : {
		USER_DETAILS	: 'userDetails',
		USER_BRIEFS		: 'userBriefs',
		USER_ACCOUNTS	: 'userAccounts',
	},
};

/**
 * Enum for announcement pending status and list orderings.
 * @readonly
 * @enum {number}
 */
exports.annc = {
	PENDING				: 0,
	ACCEPTED			: 1,
	REJECTED			: 2,
	DECREASING			: -1,
	INCREASING			: 1,
	
	db: {
		ANNC_DETAILS	: 'anncDetails',
		ANNC_BRIEFS		: 'anncBriefs',
	}
};

exports.anncTypes = [
    'research', 'part-time', 'events'
];

/**
 * A constant for the list of developer profiles.
 * @type {array}
 */
exports.developers = [
    {	
    	name: 'Cha, Seung H.',
    	info: 'Generalist',
    	pic : 'http://red967fm.com/wp-content/uploads/2014/02/profileholder-150x150.gif',
    },
    {	
    	name: 'Lee, Seungchul',
    	info: 'Back-end Enginnerer; MongoDB',
    	pic : 'http://red967fm.com/wp-content/uploads/2014/02/profileholder-150x150.gif',
    },
    {	
    	name: 'Ku, Jin Mo',
    	info: 'Front-end Enginnerer; website frame',
    	pic : 'http://red967fm.com/wp-content/uploads/2014/02/profileholder-150x150.gif',
    },
    {	
    	name: 'Truong, Alexender',
    	info: 'Front-end Enginnerer; website frame',
    	pic : 'http://red967fm.com/wp-content/uploads/2014/02/profileholder-150x150.gif',
    },
    {	
    	name: 'Choi, Chang Yong',
    	info: 'Back-end Enginnerer; MongoDB',
    	pic : 'http://red967fm.com/wp-content/uploads/2014/02/profileholder-150x150.gif',
    },
    {	
    	name: 'Guo, Ana',
    	info: 'Front-end Enginnerer; BootStarp',
    	pic : 'http://www.onerush.com/files/profile-pics/profile_female.gif',
    },
];
