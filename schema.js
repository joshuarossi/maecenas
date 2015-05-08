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
    roles: {
        type: [String],
        optional: true
    }
});

Meteor.users.attachSchema(Schema.User);

Schema.UserPrivate = new SimpleSchema({
    balance: {
        type: double,
        optional: true
    }
});

Schema.Transactions = new SimpleSchema({
    amount: {
        type: double,
        optional:false
    },
    recipient: {
        type: String,
        optional:false
    },
    fee: {
        type: double,
        optional: false
    },
    pot: {
        type: double,
        optional: false
    },
    tip: {
        type: double,
        optional: false
    }

});

Schema.Pot = new SimpleSchema({
    balance: {
        type: double,
        optional: false
    }
});

Schema.Wins = new SimpleSchema({
    amount: {
        type: double,
        optional: false
    },
    recipient: {
        type: string,
        optional: false
    }
});

