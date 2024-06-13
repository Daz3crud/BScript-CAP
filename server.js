'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const fccTesting = require('./freeCodeCamp/fcctesting.js');
const bcrypt = require('bcrypt');

const app = express();

fccTesting(app);
const saltRounds = 12;
const myPlaintextPassword = 'sUperpassw0rd!';
const someOtherPlaintextPassword = 'pass123';

app.get('/', (req, res) => {
    res.send('Hello World!');
});

//START_ASYNC -do not remove notes, place code between correct pair of notes.
bcrypt.hash(myPlaintextPassword, saltRounds, (err, hash) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(hash + " <= this is the bcrypt hash");

    // Compare the password after it has been hashed
    bcrypt.compare(myPlaintextPassword, hash, (err, result) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(result, " <= result here"); // True if passwords match

        // Change the password to a different one to see false result
        bcrypt.compare(someOtherPlaintextPassword, hash, (err, result) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(result, " <= result here with different password"); // False if passwords do not match
        });
    });
});
//END_ASYNC

//START_SYNC
// Synchronous hash and compare
try {
    const hashSync = bcrypt.hashSync(myPlaintextPassword, saltRounds);
    console.log(hashSync + " <= this is the synchronous bcrypt hash");

    const resultSync = bcrypt.compareSync(myPlaintextPassword, hashSync);
    console.log(resultSync + " <= result here"); // True if passwords match
} catch (err) {
    console.error(err);
}
//END_SYNC

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Listening on port:", PORT);
});
