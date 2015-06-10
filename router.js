/**
 * Created by joshuarossi on 5/7/15.
 */
Router.configure({
    layoutTemplate: 'Bootstrap3boilerplate'
});

Router.route('/', {
    subscriptions: function() {
        return Meteor.subscribe('allUserData');
    },
    action: function () {
    this.render('Home');
    }
});

Router.route('/about');

//Router.route('/transactions', { where: 'server' })
//    .post(function () {
//        console.log('someone called POST on /transactions\n');
//        console.log(this.request.body);
//        Transactions.insert(this.request.body);
//        return "Received your query";
//    });

Router.route('/transactions', {
        subscriptions: function() {
            return Meteor.subscribe('allTransactions');
        },
        data: function () {
            return bitcoinEvents.find();
        }
});

Router.route('/plugin/test', function () {
    this.layout('pluginLayout');
    this.render('carousel', {to: 'plugin'});
    this.render('donate_form', {to: 'donation_form'})
});

Router.route('/plugin/:username', {
    subscriptions: function() {
        return Meteor.subscribe('allUserData');
    },
    layoutTemplate: 'pluginLayout',
    action: function () {
    if (this.ready()) {
        this.render('carousel', {
            to: 'plugin',
            data: function () {
                return Meteor.users.findOne({username: this.params.username});
        }
    });
    }
    else {
        this.render('Loading');
    }
  }
});