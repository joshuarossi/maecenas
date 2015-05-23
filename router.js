/**
 * Created by joshuarossi on 5/7/15.
 */
Router.configure({
    layoutTemplate: 'Bootstrap3boilerplate'
});

Router.route('/', function () {
    this.render('Home');
});

Router.route('/about');

Router.route('/transactions', { where: 'server' })
    .get(function () {
        console.log('Someone called GET on /transactions...\n');
        this.response.end('Someone called GET on /transactions\n')
    })
    .post(function () {
        console.log('someone called POST on /transactions\n');
        console.log(this.request.body);
        Transactions.insert(this.request.body);
        return "Received your query"
    });

Router.route('/plugin/test', function () {
    this.layout('pluginLayout');
    this.render('carousel', {to: 'plugin'});
    this.render('donate_form', {to: 'donation_form'})
});

Router.route('/plugin/:username', function () {
    this.layout('pluginLayout');
    this.render('carousel', {
        to: 'plugin',
        data: function () {
            return Meteor.users.findOne({username: this.params.username})
        }
    });
});