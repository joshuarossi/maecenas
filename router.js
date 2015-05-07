Router.configure({
    layoutTemplate: 'layout'
});
Router.route('/', function () {
    this.render('home');
});

Router.route('/about');

Router.route('/login');

Router.route('/plugin/:username', function () {
    this.render('plugin', {
        data: function () {
            return this.params.username;
        }
    });
});