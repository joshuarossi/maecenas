

if (Meteor.isClient) {
  testNode = function testNode(callback) {
    Meteor.call('testNode', callback);
  }
}

if (Meteor.isServer) {
  Meteor.methods({
    'testNode': function testNode() {
      var Round = Meteor.npmRequire('round-node');
      Round.client(function (error, client) {
      var creds = {
        api_token: "znpyzF7QoLWweBid2oy-iIoBsocBVRIZIlzl4KHGm8Y",
        admin_token: "bQkz35qDfbs0I3ks41QprdLZ2tl5q_rlvHK4mZB3x6Q",
        totp_secret: "yjztn5drz4ewfmu7"
      }
      client.authenticate_application(creds, function (error, application) {
        application.wallets(function(error, wallets) {
          walletInfo = {
            name: 'wallet' + Math.random(),
            passphrase: 'password' 
          }
          wallets.create(walletInfo, function(error, wallet) {
            wallet.accounts(function(error, accounts) {
              var account = accounts.get(0)
              account.addresses(function(error, addresses) {
                addresses.create(function(error, address) {
                  console.log(address.string)
                });
              });
            });
          });
        });
      });
    });
      
    }
  });
}
