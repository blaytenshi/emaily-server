const passport = require('passport'); // nothing to do with services/passport

module.exports = (app) => { // exporting a function
    app.get(
        '/auth/google',
        passport.authenticate('google', { // 'google' is a magic string that will identify the GoogleStrategy we're using to authenticate with
            scope: ['profile', 'email'] // scope tells google what we wanna get access to, these strings are a list on google
        })
    );

    app.get(
        '/auth/google/callback', // when this route is called back by google with the verification token, passport will use it to request data from google can call the callback function we first defined in new GoogleStrategy
        passport.authenticate('google'),
        (req, res) => { // this is a function that be executed after passport.authenticate() is finished
            res.redirect('/surveys'); // the function tells the browser to redirect the user to "/surveys"
        }
    );

    app.get('/api/logout', (req, res) => {
        req.logout(); // logout() is attached to the req object by passport!
        res.redirect('/');
    });

    app.get('/api/current_user', (req, res) => {
        // res.send(req.session);
        res.send(req.user);
    })
};
