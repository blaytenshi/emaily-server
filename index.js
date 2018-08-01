const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

const app = express(); // gets an instance of an express server. Usually you'll only ever need one.

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

app.get(
    '/auth/google',
    passport.authenticate('google', { // 'google' is a magic string that will identify the GoogleStrategy we're using to authenticate with
        scope: ['profile', 'email'] // scope tells google what we wanna get access to, these strings are a list on google
    })
);

app.get(
    '/auth/google/callback', // when this route is called back by google with the verification token, passport will use it to request data from google can call the callback function we first defined in new GoogleStrategy
    passport.authenticate('google')
);

const PORT = process.env.PORT || 5000; // port will be set by your server or default to 5000
app.listen(PORT);