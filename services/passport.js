const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users'); // fetch the model class out of mongoose instead of requiring the whole thing in because reasons (mongoose doesn't like it)

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback' // what google will send back the OAuth code on
    }, (accessToken, refreshToken, profile, done) => { // this callback is called by the passport.authenticate() function in /auth/google/callback automatically
        // console.log('access token', accessToken); // like a permission pass (token) to go to google and make requests for information
        // console.log('refresh token', refreshToken); // a pass to refresh the access token because the access token expires after a period of time
        // console.log('profile', profile); // profile data
        User.findOne({ googleId: profile.id }) // find the first matching key (googleId) with a given value (profile.id) and return it
            .then((existingUser) => { // when the promise resolves it will either contain the existing user or it will return null (error first convention)
                if (existingUser) {
                    // we already have a record with the given profile ID
                } else {
                    // we don't have a user record with this ID, make a new record
                    new User({
                        googleId: profile.id // creates a new instance of a user
                    }).save() // saves it to mongodb
                }
            })

    })
); // creates a new instance of the GoogleStrategy