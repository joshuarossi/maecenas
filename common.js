/**
 * Created by joshuarossi on 5/15/15.
 */
function transitionEffect () {
    Session.set('selected', true);
    Meteor.setTimeout(function () {
        Session.set('selected', false);
    }, 250);
}

Meteor.startup(function () {
    bitcoinEvents = new Mongo.Collection('bitcoin_events');
    Jackpot = new Mongo.Collection("jackpot");
    var query = Jackpot.find({_id: 'a'});
    var toggle = new ReactiveVar(0);
    Transactions = new Mongo.Collection("transactions");
//    Server
    if (Meteor.isServer) {
        if (Jackpot.find().count() == 0) {
            Jackpot.insert({_id: 'a', 'value': 0});
        }
        Meteor.publish('jackpot_publish', function () {
            return Jackpot.find({_id: 'a'})
        });
        Meteor.publish("allUserData", function () {
            return Meteor.users.find({}, {fields: {'balance': 1, 'profile': 1, 'username': 1}});
        });
        Meteor.publish("allTransactions", function () {
            return bitcoinEvents.find({});
        });
        getPubnub(creds);
    }
//   Client
    if (Meteor.isClient) {
        jackpot_subscription = Meteor.subscribe('jackpot_publish');
        var handle = query.observeChanges({
            changed: function () {
                console.log(toggle);
                toggle.set(toggle.get() + 1);
            }
        });
        Tracker.autorun(function () {
            if (toggle.get() > 0){
                transitionEffect();
            }
        });
    }
});
