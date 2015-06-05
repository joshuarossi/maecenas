Accounts.onCreateUser(function(options, user) {
	console.log('Creating new user...');
	console.log(getNewBitcoinAddress());
	if (options.profile)
		user.profile = options.profile;
	  	return user;
});