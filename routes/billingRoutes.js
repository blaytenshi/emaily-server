const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);

module.exports = app => {
    app.post('/api/stripe', (req, res) => {
        // here we will make a request (with the token provided in request) to stripe API to check whether the payment was finalised
        // once it's finalised we will increment the user's email campaign credits
        // console.log("CARD TOKEN", req.body);
        stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: '$5 for 5 credits on Emaily',
            source: req.body.id
        })

    });
};