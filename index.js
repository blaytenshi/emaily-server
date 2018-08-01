const express = require('express');
const app = express(); // gets an instance of an express server. Usually you'll only ever need one.

app.get('/', (req, res) => {
    res.send({ hi: 'there' });
});

const PORT = process.env.PORT || 5000; // port will be set by your server or default to 5000
app.listen(PORT);