const mongoose = require('mongoose');

const { Schema } = mongoose;

const surveySchema = new Schema({
    title: String,
    subject: String,
    body: String,
    recipients: [String], // array of strings
    yes: { type: Number, default: 0 },
    no: { type: Number, default: 0 }
});

mongoose.model('surveys', surveySchema);