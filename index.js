const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express(); // gets an instance of an express server. Usually you'll only ever need one.

passport.use(new GoogleStrategy()); // creates a new instance of the GoogleStrategy

const PORT = process.env.PORT || 5000; // port will be set by your server or default to 5000
app.listen(PORT);