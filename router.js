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

Router.route('/plugin/:username', function () {
    this.layout('pluginLayout');
    this.render('plugin', {
        data: function () {
            return this.params.username;
        }
    });
});
