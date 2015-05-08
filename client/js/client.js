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
    return [{href:'/',text:'Home'}, {href:'/about',text:'About'}]
};
Bootstrap3boilerplate.Navbar.right = function () {
    return [{showLoginButtons:true, align: 'right'}]
};
Bootstrap3boilerplate.init();

Template.pluginLayout.rendered = function () {
    $('#carousel').slick({
        arrows: true,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear'
    });
};