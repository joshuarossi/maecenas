if (Meteor.isServer) {
  Meteor.methods({
    'getAddress': function getAddress() {
      var roundnode = Meteor.npmRequire('round-node');

      Round.client(options, function(error, client) {
        
      });

      
      });

      //return something
    }
  });
}