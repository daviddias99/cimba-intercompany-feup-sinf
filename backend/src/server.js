const express = require('express');
const db = require('../database/knex.js');

const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to Cimba Intercompany.');
});

app.get('/users', (req, res) => {
    db('users').select()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            console.log('Failed to establish connection to database! Exiting...');
            console.log(err);
            process.exit(1);
        });
});

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}.`);
});
