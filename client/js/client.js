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

Template.profile.helpers({
    'balance': function () {
        return Meteor.user() && Meteor.user().balance.toFixed(8);
    },
    'balance_dollar_value': function (){
        if (Meteor.user()){
            return Meteor.user() && (Meteor.user().balance * bitfinex_price()).toFixed(2);
        }
    }
});

Template.carousel.rendered = function () {
    $('#carousel').slick({
        dots: false,
        arrows: true,
        draggable: true,
        useCSS: false,
        prevArrow: '<i class="fa fa-chevron-left"></i>',
        nextArrow: '<i class="fa fa-chevron-right"></i>'
    });
};

Template.carousel.helpers({
    'selected': function () {
        return Session.get('selected')
    }
});
Template.transactions.helpers({
    transactions: function () {
        return bitcoinEvents.find({'event_code': 'credit_0'});
    }
});

//gives us access to the jackpot value
Template.pageOne.helpers({
    'jackpot': function () {
        if (jackpot_subscription.ready()) {
            return +Jackpot.findOne({_id: 'a'}).value.toFixed(8);
        }
    },
    'prize_value': function () {
        return +(Jackpot.findOne({_id: 'a'}).value * bitfinex_price()).toFixed(2);
    }
})
;

//Simple form to change the jackpot amount (increment by 20%)
Template.donate_form.events({
    'submit form': function () {
        event.preventDefault();
        var donation = event.target.donation.value * 0.20;
        Jackpot.update({_id: 'a'}, {$inc: {value: donation}});
        event.target.donation.value = "";
    }
});

Template.pageTwo.onRendered(function(){
    $('#qrcode').qrcode({
        text: "bitcoin:" + this.data.profile.internal_address + "?amount=.001&message=donation",
        render: 'canvas',
        ecLevel: 'H',
        radius: 0.2
    });
});