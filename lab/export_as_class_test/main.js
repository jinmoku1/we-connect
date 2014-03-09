var dbUser = require ('./db_user');

dbUser.put({ netId:'scha3', password:'asdfasfdsdf'});
dbUser.getByNetId('scha3', function(user) {
	console.log(user);
});