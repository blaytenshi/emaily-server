module.exports = app => {
    app.post('/api/stripe', (req, res) => {
        // here we will make a request (with the token provided in request) to stripe API to check whether the payment was finalised
        // once it's finalised we will increment the user's email campaign credits
    });
};