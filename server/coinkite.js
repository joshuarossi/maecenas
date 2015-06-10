creds =  {
auth_key: 'Pg1XyruLTIfueQFRK5JSUCxwZ6xxTBw2',
channel: 'events.703ae0812ab73c7366c57531b18f826a',
subscribe_key: 'sub-c-5388b9e4-f307-11e3-a672-02ee2ddab7fe'
}

API_KEY = 'K5045dbff-22b1fb6b-03250f5c4a0d860e'
API_SECRET = 'S9e38116a-cb269539-66123cacd4ff161d'

updateBalances = function (details) {
	if (details.type == 'Credit') {
		address = details.credit_txo.coin.address;
		amount = details.credit_txo.amount;
		account = Meteor.users.findOne({'profile.internal_address': address});
		Meteor.users.update({'profile.internal_address': address}, {$inc: {balance: (amount*0.8)}});
		Jackpot.update({_id: 'a'}, {$inc: {value: (amount*0.2)}});
	}
};

messageCallback = Meteor.bindEnvironment(function (message) {
	if (message.event_code == "credit_0"){
		response = getDetail(message.activity);
		message.details = response.data.detail;
		updateBalances(message.details.event);
	}
	bitcoinEvents.insert(message);
});

sign = function (endpoint, force_ts) {
    ts = force_ts || (new Date()).toISOString(); 
    data = endpoint + '|' + ts;
    crypto = Npm.require('crypto');
    hm = crypto.createHmac('sha256', API_SECRET).update(data).digest('hex')
    return [hm, ts]
};

getNewAddress = function () {
	endpoint = '/v1/new/receive'
	a = sendToCoinkite(endpoint, {'account': 0}, 'put');
	console.log(a.data.result.address);
	return a.data.result.address;
};

sendToCoinkite = function (endpoint, data, command) {
	url = 'https://api.coinkite.com';
	signature = sign(endpoint);
	headers = {
		'X-CK-Key': API_KEY,
		'X-CK-Sign': signature[0],
		'X-CK-Timestamp': signature[1]
		};
	options = {};
	options.data = data;
	options.headers = headers;
	if (command == 'put'){
		a = HTTP.put(url+endpoint, options);
		}
	else {
		a = HTTP.get(url+endpoint, options)
		}
	return a;
};

getPubnub = function (creds) {
	pubnub = Meteor.npmRequire("pubnub")({
		ssl           : true,
		auth_key   : creds.auth_key,
		subscribe_key : creds.subscribe_key
		});
	var message = { "some" : "data" };
 pubnub.subscribe({
    channel : creds.channel,
    message : function( message, env, channel ){
       // RECEIVED A MESSAGE.
	   messageCallback(message);
    },
    connect: function(){console.log("Connected")},
    disconnect: function(){console.log("Disconnected")},
    reconnect: function(){console.log("Reconnected")},
    error: function(e){
        console.log(e);
        },
 });
return pubnub;
};

testPubnub = function () {
	endpoint = '/v1/pubnub/send';
	a = sendToCoinkite(endpoint, {'message':'test'}, 'put');
	return a;
}

getBalance = function () {
	endpoint = '/v1/account/0';
	a = sendToCoinkite(endpoint, {});
	return a.data.account;
};

getDetail = function (refnum) {
	endpoint = '/v1/detail/' + refnum;
	a = sendToCoinkite(endpoint, {});
	return a;
};