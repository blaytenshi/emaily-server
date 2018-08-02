const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/User'); // this needs to be before we require services/passport because we need to load the model before we can use it in services/passport
require('./services/passport'); // this ensures the passport file gets executed (even though there's no export)
// const authRoutes = require('./routes/authRoutes'); // exporting authRoutes to a const

mongoose.connect(keys.mongoURI);

const app = express(); // gets an instance of an express server. Usually you'll only ever need one.

// authRoutes(app); // sets up routes
require('./routes/authRoutes')(app); // this line replaces line 6 and line 12. This is currying.
// the way to look at this line is that require, once executed, exports a function. Then we're invoking that function with the 'app' const.

const PORT = process.env.PORT || 5000; // port will be set by your server or default to 5000
app.listen(PORT);