if (Meteor.isClient) {
    console.log('Starting up from the console...');
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        console.log('Started up the server...')
    });
}

