const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);

module.exports = app => {
    app.post('/api/stripe', async (req, res) => {

        // checks if someone is already logged before executing the rest of the logic!
        if (!req.user) {
            return res.status(401).send({ error: 'You must log in!'});
        }

        // here we will make a request (with the token provided in request) to stripe API to check whether the payment was finalised
        // once it's finalised we will increment the user's email campaign credits
        // console.log("CARD TOKEN", req.body);
        const charge = await stripe.charges.create({
            amount: 500, // used to confirm the amount. This value on front end is more like an authorization
            currency: 'usd', // currency
            description: '$5 for 5 credits on Emaily',
            source: req.body.id // the id of the token
        });

        // get a reference to the current user model with req.user
        req.user.credits += 5;

        const user = await req.user.save();

        res.send(user);

    });
};