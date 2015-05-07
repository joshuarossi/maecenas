Schema = {};

Schema.UserProfile = new SimpleSchema({
  firstName: {
    type: String,
    regEx: /^[a-zA-Z-]{2,25}$/,
    optional: true
  },
  lastName: {
    type: String,
    regEx: /^[a-zA-Z]{2,25}$/,
    optional: true
  },
  website: {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
    optional: true
  },
  bitcoin_address: {
    type: String,
    optional: true
  }
});

Schema.User = new SimpleSchema({
  username: {
    type: String,
    regEx: /^[a-z0-9A-Z_]{3,15}$/
  },
  emails: {
    type: [Object],
    // this must be optional if you also use other login services like facebook,
    // but if you use only accounts-password, then it can be required
    optional: true
  },
  "emails.$.address": {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  "emails.$.verified": {
    type: Boolean
  },
  createdAt: {
    type: Date
  },
  profile: {
    type: Schema.UserProfile,
    optional: true
  },
  services: {
    type: Object,
    optional: true,
    blackbox: true
  },
  // Option 2: [String] type
  // If you are sure you will never need to use role groups, then
  // you can specify [String] as the type
  roles: {
    type: [String],
    optional: true
  }
});

Meteor.users.attachSchema(Schema.User);

Router.configure({
  layoutTemplate: 'Bootstrap3boilerplate'
});

Router.route('/', function () {
  this.render('Home');
});

Router.route('/about');

Router.route('/plugin/:username', function () {
  this.render('plugin', {
    data: function () {
      return this.params.username;
    }
  });
});

if (Meteor.isClient) {
  console.log('Starting up from the console...');
  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
  });

  Meteor.isDevelopment = false;
  Bootstrap3boilerplate.init();
  Bootstrap3boilerplate.Navbar.inverse.set(true);
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    console.log('Started up the server...')
  });
}
