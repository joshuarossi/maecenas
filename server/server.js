if (Meteor.isServer) {
  Meteor.methods({
    'getAddress': function getAddress() {
      var kite = Meteor.npmRequire('coinkite-javascript'); 
      var sign = kite.auth_headers('Kd3f45974-9b2c5376-3eefd77f2f28470d', 'Sacf772f4-d07889c6-197197aa531a43b7', '/v1/new/receive');
      Meteor.http.call("PUT", "http://api.coinkite.com/v1/new/receive", { params: { 'X-CK-Key': sign['X-CK-Key'], 'X-CK-Sign': sign['X-CK-Sign'], 'X-CK-Timestamp': sign['X-CK-Timestamp'] }});
    }
  });
}