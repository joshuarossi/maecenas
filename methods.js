/**
 * Created by joshuarossi on 5/15/15.
 */


Meteor.methods({
    'test': function (a) {
        console.log(a);
        return a;
    }
});
