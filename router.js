/**
 * Created by joshuarossi on 5/7/15.
 */
Router.configure({
    layoutTemplate: 'Bootstrap3boilerplate'
});

Router.route('/', function () {
    this.render('Home');
});

Router.route('/test', function () {
    console.log('test')
    this.response.end(JSON.stringify(this.params.query, null, 4));
    Meteor.call('test', this.params.query );
}, {where: 'server'});

Router.route('/about');

Router.route('/plugin/:username', function () {
    this.layout('pluginLayout');
    this.render('plugin', {
        data: function () {
            return this.params.username;
        }
    });
    this.render('pluginfirst', {to: 'first'});
    this.render('pluginsecond', {to: 'second'});
    this.render('pluginthird', {to: 'third'});
});
