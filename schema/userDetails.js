// userDetails

{
    // profile information
    netId			: "netId",
    firstName		: "First",
    lastName		: "Last",
    profilePicUrl	: "/data/profile_pic/netId.jpg",
    intro			: "I love snow",

    // Academics
    department	: "CS",
    interests	: [
    	{
    		_id	: Object(), // interest ID
    		name : "Data Mining" // of _id
    	}
    	// , ...
    ],

    followings	: [
    	{
    		_id		: Object(), // userDetail ID
    		name 	: "First Last" // of _id
    	}
    	// , ...
    ]

    followees	: [
    	{
    		_id		: Object(), // userDetail ID
    		name 	: "First Last" // of _id
    	}
    	// , ...
    ]

    bookmarkedAnnc	: [
    	{
    		_id			: Object(), // of Annc
    		title		: "title", // of _id
    		authorName	: "First Last" // of _id
    	}
    	// , ...
    ]

    appliedAnnc : [
    	{
    		_id			: Object(), // of Annc
    		title		: "title", // of _id
    		authorName	: "First Last", // of _id
    		anncType	: 0 // of _id
    	}
    	// , ...
    ]

	// 0: Student, 1: Faculty, 2: Admin
    userType : 0,

    // extension either one of following objects
    // Student's Extension
    extension : {
    	canPost			: false,
    	overallGPA		: 3.5,
    	technicalGPA	: 2.0,
    	degree			: 0, // Undergraduate, ...
    	classStanding	: 0, // Freshman, ...

    	coursesTaken	: [
    		{
    			_id		: Object(), // course ID
    			name 	: "Database System" // of _id
    			grade	: "A" // not of _id
    		}
    		// , ...
    	],

    	resumeUrl		: "/data/resume/netId.pdf",

    	anncPreferences	: [
            0 // research, part-time, events...
            // , ...
    	]
    }

    // Faculty's Extension
    extension : {
    	websiteUrl		: "http://www.darkoworld.com",
    	coursesTaught	: [
    		{
    			_id			: Object(), // course ID
    			name 		: "Database System"
    			semester	: 0,
    			year		: 2014
    		}
    		// , ...
    	],
    }
}