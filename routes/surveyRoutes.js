const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
    app.get('/api/surveys/thanks', (req, res) => {
        res.send('Thanks for voting!');
    });

    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        // these properties come from the body-parser
        const { title, subject, body, recipients } = req.body;

        const survey = new Survey({
            title,
            subject,
            body,
            // set up Recipient sub document object here
            // split up the recipients array by ','. map over each email element and return an object that looks like { email: email }
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now()
        });

        try {
            // send the email!
            // create a new Mailer object
            const mailer = new Mailer(survey, surveyTemplate(survey));
            // send the mail
            await mailer.send();
            // after mailer completes sending, call save on the survey to save to database
            await survey.save();
            // deduct a credit from the user object
            req.user.credits -= 1;
            // save the user object
            const user = await req.user.save();

            // by sending back the user object in the response, we're updating all the user credit information, login information, etc
            res.send(user);
        } catch (error) {
            res.status(422).send(error) // 422 is 'Unprocessable entity' or user sent us incorrect data
        }
    });
};