Accounts.onCreateUser(function(options, user) {
	if (options.profile) {
		console.log('good');
	}
	else {
		options.profile = {}
	}
	console.log('Creating new user...');
	user.profile = options.profile;
	user.profile.internal_address = getNewBitcoinAddress();
	console.log('new bitcoin address' + user.profile.internal_address);
  	return user;
});