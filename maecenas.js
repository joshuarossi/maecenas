if (Meteor.isClient) {
    console.log('Starting up from the console...');
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        console.log('Started up the server...')
    });
}
Meteor.startup(function() {
    // Add Facebook configuration entry
    ServiceConfiguration.configurations.update(
      { "service": "facebook" },
      {
        $set: {
          "appId": "1639777159574816",
          "secret": "8de6f0f33b4c5276ccd82637bdbbb135"
        }
      },
      { upsert: true }
    );
   
});
