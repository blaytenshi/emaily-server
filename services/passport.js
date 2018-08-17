const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users'); // fetch the model class out of mongoose instead of requiring the whole thing in because reasons (mongoose doesn't like it)

// this method is called by passport after it retrieves a matching user in passport.use() after done() is called.
passport.serializeUser((user, done) => { // the user that is passed in here comes from the done(). Remember this user is the object coming back from mongoDB not what we instantiated with the model class
    done(null, user.id); // this id is what was generated by mongoDB when we created this user object inside mongoDB
});

// this function is called by passport when it detects from the cookie an id. When it gets an id, it will use the model class to find by id on the mongoDB and call done with the found user object.
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        });
});

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback', // what google will send back the OAuth code on, this relative path may cause the app to switch from https to http thereby causing the OAuth flow to break.
        proxy: true // we need this option to because when Google strategy goes through a proxy, it automatically does NOT trust information coming back from a proxy and thus drops the S from HTTPS.
    },
    async (accessToken, refreshToken, profile, done) => { // this callback is called by the passport.authenticate() function in /auth/google/callback automatically
        const existingUser = await User.findOne({ googleId: profile.id }); // find the first matching key (googleId) with a given value (profile.id) and return it. The returned object will either be the existing user or null.

        if (existingUser) {
            // we already have a record with the given profile ID
            return done(null, existingUser); // calling done() function to tell passport that we're complete and proceed with the auth flow. First param is an error object. Second param is the user record. Calling return here will ensure the rest of the code is not executed.
        }

        // we don't have a user record with this ID, make a new record
        const user = await new User({googleId: profile.id}).save(); // creates a new instance of a user and saves it to mongodb, await for it to complete and whatever comes back, assign to user variable
        done(null, user);
    })
); // creates a new instance of the GoogleStrategy