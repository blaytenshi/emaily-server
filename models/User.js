// This is a model class (as indicated by Capital in file name). Used by MongoDB.
const mongoose = require('mongoose');
// const Schema = mongoose.Schema; // same as line 3
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String, // what piece of data to store and what type it is
    credits: { type: Number, default: 0 }
});

// tells mongoose to create a new collection called users
mongoose.model(
    'users', // name of the collection
    userSchema // schema of the collection
);