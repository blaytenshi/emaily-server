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
        this.from_email = new helper.Email('no-reply@emaily.com');
        this.subject = subject;
        this.body = new helper.Content('text/html', content);
        this.recipients = this.formatAddresses(recipients);
    }
}

// Capital because it exports a class
module.exports = Mailer;