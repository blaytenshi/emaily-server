const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient'); // don't have to import it in index.js because it's already imported here

const surveySchema = new Schema({
    title: String,
    subject: String,
    body: String,
    recipients: [RecipientSchema], // array of sub document collection
    yes: { type: Number, default: 0 },
    no: { type: Number, default: 0 },
    _user: { type: Schema.Types.ObjectId, ref: 'User' }, // _ indicates it's a reference field. Also this sets up a many to one relationship to a user object.
    dateSent: Date, // like a created date
    lastResponded: Date // latest time someone has voted on a survey
});

mongoose.model('surveys', surveySchema);