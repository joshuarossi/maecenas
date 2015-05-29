if (Meteor.isServer) {
  Meteor.methods({
    'testNode': function testNode(user) {
      var node = Meteor.npmRequire('round-node');
      
    }
  });
}