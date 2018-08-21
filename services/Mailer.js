const sendgrid = require('sendgrid');
const helper = sendgrid.mail; // taking the mail helper from sendgrid
const keys = require('../config/keys');

class Mailer extends helper.Mail {

}

// Capital because it exports a class
module.exports = Mailer;