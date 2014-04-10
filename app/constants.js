/**
 * New node file
 */

exports.db = {
	//CONNECTION_STRING : 'mongodb://127.0.0.1:27017/weconnect',
	//CONNECTION_STRING : 'mongodb://hay.synology.me:27017/weconnect',
	CONNECTION_STRING : 'mongodb://wizub.com:27017/weconnect',
};

exports.interests = [
	'Software Engineering', 'Data Mining', 'Machine Learning', 'Algorithm',
	'Graphics', 'Multimedia', 'Aritificial Intelligence', 'Database', 'User Inteface',
	'Web Development', 'System Programming', 'Network', 'Security',
];

exports.departments = [
	'CS', 'ECE', 'EE', 'PHYS', 'MATH', 'CHEM',
];

exports.courses = [
	'CS411 Database Systems', 'CS438 Communication Networks', 'CS440 Artificial Intelligence',
	'CS428 Software Engineering', 'CS210 Ethics in Computer Science', 'CS423 Operating Systems Design',
	'CS465 User Interface Design', 'CS241 System Programming', 'CS242 Programming Studio',
	'CS431 Embedded Systems', 'CS425 Distributed System', 'ECE391 Computer Systems Engineering',
	'PHYS214 Univ. Physics: Quantum Physics',
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

exports.anncTypes = [
    'research', 'part-time', 'events'
];

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
