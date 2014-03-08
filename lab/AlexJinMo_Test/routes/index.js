
/*
 * GET rendered view page.
 */

exports.index = function(req, res) {
	res.render('index',	{
		title: 'WeConnect',
		description: 'Some description about this application should be placed here.',
	});
};

exports.about = function(req, res) {
	res.render('about',	{
		title: 'About WeConnect',
		description: 'Some description about WeConnect should be placed here.',
		extra: 'Some extra stuffs?'
	});
};

exports.userMain = function(req, res) {
	var netID = req.body.netID;
	var password = req.body.password;
	var firstname = req.body.firstname;
	var lastname = req.body.lastname;
	var interest = req.body.interest;
	var department = req.body.department;
	var standing = req.body.standing;
	if (firstname == null || lastname == null || interest == null || department == null){
		// Login directed here
		
		// Authentication
		
		// Register session
		
	}
	else {
		if (standing == null){
			// Faculty Sign up directed here
			// Database insertion: Faculty
			
			
		}
		else {
			// Student Sign up directed here
			// Database insertion: Student
			
			
		}
		// Create a session
		
	}
	
	
	
	res.render('userMain',	{
		title: 'WeConnect: Main',
		welcome: 'Hello, ' + firstname + " " + lastname,
	});
};