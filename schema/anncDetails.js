// anncDetails

{
    author  : {
        _id     : Object(),
        name    : "First Last", // of _id
        netId   : "netId", // of _id
        profilePic	: "www.haha.com",
    },

    title       : "Title of Announcement",
    timeStamp   : "13232342342",

    // filtering properties
    anncTypes : [
        0 // research, part-time, events...
        // , ...
    ],

    interests  : [
        {
           _id : Object(), // interest
           name : "Data Mining", // of _id
        }
        // , ...
    ],

    coursesTaken    : [
        {
            _id     : Object(), // course ID
            name    : "Database System" // of _id
            grade   : "A" // not of _id
        }
        // , ...
    ],

    degree          : 0, // undergraduate, graduate, ...
    overallGPA      : 3.0,
    technicalGPA    : 2.0,
    classStanding   : 3,
    resumeRequired  : false,

    // contents
    content        : "I need you",

    status : 0, // Pending, Open, Expired

    applicants      : [
        {
            _id : Object(), // of userDetail
            name : "First Last", // of _id
            message : "RSVP date, or something", // not of _id
        }
        // , ...
    ]
}