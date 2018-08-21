const sendgrid = require('sendgrid');
const helper = sendgrid.mail; // taking the mail helper from sendgrid
const keys = require('../config/keys');

class Mailer extends helper.Mail {
    constructor(
        { subject, recipients }, // the desconstructed survey object
        content // the html template
    ) {
        super(); // executes any contructor on the Mail class

        // sendgrid stuff
        this.from_email = new helper.Email('no-reply@emaily.com'); // helper.Email is from sendgrid
        this.subject = subject;
        this.body = new helper.Content('text/html', content); // helper.Content is also from sendgrid
        this.recipients = this.formatAddresses(recipients); // formatAddress is a custom function we define ourselves

        this.addContent(this.body); // this addContent is from sendgrid. We call this to tell sendgrid that this is the content we want for the body
        this.addClickTracking(); // our own defined function required by sendgrid to setup click tracking
        this.addRecipients();
    }

    formatAddresses(recipients) {
        // map through the recipients array that has a recipient object in the form of { email: 'blah', clicked: true/false }
        // extract the email portion out using ES6 syntax and pass it into the function
        return recipients.map(({ email }) => {
            return new helper.Email(email); // use sendgrid helper library to build the email object
        })
    }

    addClickTracking() {
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }

    addRecipients() {
        const personalize = new helper.Personalization();
        this.recipients.forEach(recipient => {
            personalize.addTo(recipient);
        });
        this.addPersonalization(personalize);
    }
}

// Capital because it exports a class
module.exports = Mailer;