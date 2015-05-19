/**
 * Created by joshuarossi on 5/7/15.
 */


Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
});

Meteor.isDevelopment = false;
Bootstrap3boilerplate.ProjectName.set('Maecenas');
Bootstrap3boilerplate.fluid.set(true);
Bootstrap3boilerplate.Navbar.type.set('navbar-fixed-top');
Bootstrap3boilerplate.Navbar.inverse.set(true);
Bootstrap3boilerplate.Footer.show.set(false);
Bootstrap3boilerplate.Navbar.left = function () {
    return [{href: '/', text: 'Home'}, {href: '/about', text: 'About'}]
};
Bootstrap3boilerplate.Navbar.right = function () {
    return [{showLoginButtons: true, align: 'right'}]
};
Bootstrap3boilerplate.init();

Template.pluginfirst.helpers({
    'btc_jackpot': function () {
        console.log(Jackpot.findOne().value);
        return Jackpot.findOne().value
    },
    'usd_jackpot': function () {
        console.log(Jackpot.findOne().value * 240.0);
        return Jackpot.findOne().value * 240.00
    }
});


if (Meteor.isClient) {
    Session.setDefault({'button_hidden': true});
    Template.pluginLayout.rendered = function () {
        $('#carousel').slick({
            dots: false,
            arrows: true,
            draggable: true,
	    prevArrow: '<i class="fa fa-chevron-left"></i>',
	    nextArrow: '<i class="fa fa-chevron-right"></i>'
        });
    };
    Template.pageOne.helpers({
        'buttonHidden': function () {
            return Session.get('button_hidden')}
    });

    Template.pluginLayout.events({
        'mouseenter #carousel': function () {
            Session.set({'button_hidden': false});
            console.log(Session.get('button_hidden'))
        },
        'mouseleave #carousel': function () {
            Session.set({'button_hidden': true});
            console.log(Session.get('button_hidden'))
        }
    })
}
