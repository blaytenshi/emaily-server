const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');

const Survey = mongoose.model('surveys');

module.exports = app => {
    app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
        // these properties come from the body-parser
        const { title, subject, body, recipients } = req.body;

        const survey = new Survey({
            title,
            subject,
            body,
            // set up Recipient sub document object here
        })
    });
};