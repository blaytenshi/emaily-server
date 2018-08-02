const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback' // what google will send back the OAuth code on
    }, (accessToken, refreshToken, profile, done) => { // this callback is called by the passport.authenticate() function in /auth/google/callback automatically
        console.log('access token', accessToken); // like a permission pass (token) to go to google and make requests for information
        console.log('refresh token', refreshToken); // a pass to refresh the access token because the access token expires after a period of time
        console.log('profile', profile); // profile data
    })
); // creates a new instance of the GoogleStrategy