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
	user.balance = 0.0;
  	return user;
});
bfx = new Bitfinex();
bfx.connect();
Meteor.setTimeout(bfx.subscribeLevelOne, 2000);