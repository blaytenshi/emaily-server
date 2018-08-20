const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User'); // this needs to be before we require services/passport because we need to load the model before we can use it in services/passport
require('./services/passport'); // this ensures the passport file gets executed (even though there's no export)
// const authRoutes = require('./routes/authRoutes'); // exporting authRoutes to a const

mongoose.connect(keys.mongoURI);

const app = express(); // gets an instance of an express server. Usually you'll only ever need one.

// whenever a request comes to our server and has content in the body, it will be taken and put into the req.body property of the request object.
app.user(bodyParser.json());
// app.use() accepts objects. They wire up middware inside the express application. Used to modify incoming requests before they're passed to route handlers.
app.use(
    cookieSession({ // cookie session middleware - intercepts the request to express/node and extracts cookie data and assigns it to req.session property.
        maxAge: 30 * 24 * 60 * 60 * 1000, // last for 30 days before cookie expires,
        keys: [keys.cookieKey] // array allows us to put more than one cookie key and the cookieSession library will pick one at random
    })
);
// NOTE: Express recommends two different libraries to manage your cookies/sessions. One being cookie-session and the other being express-session.
// cookie-session : assigns data (in this case the user info) to the cookie when response is sent back. extracts data out of the cookie and assign it to req.session when a request to the server is made.
// express-session : assigns an id (a REFERENCE) of a session when a response is sent back. Takes the id out and looks up the relevant info from a 'session store'. This session store can be a seperate database.
// Main diff: cookie-session stores the session as the cookie and gives it to the user, express-session stores the reference of the session in the cookie and the contents of the session elsewhere.
// But why? Cookies can only hold 4kb of data where as if we store the session server-side, we can store as much as we want!

// initialise the passport library...
app.use(passport.initialize());
// call the session function to get the passport user data from req.session, take it and pass it to deserialiseUser() (called automatically when it has a session).
// In the function (in passport.js under deserialiseUser()), the first parameter passed to it is id in mongoDB. It will use that id to get the user data out of the database.
app.use(passport.session());

// authRoutes(app); // sets up routes
require('./routes/authRoutes')(app); // this line replaces line 6 and line 12. This is currying.
// the way to look at this line is that require, once executed, exports a function. Then we're invoking that function with the 'app' const.
require('./routes/billingRoutes')(app);

const PORT = process.env.PORT || 5000; // port will be set by your server or default to 5000
app.listen(PORT);