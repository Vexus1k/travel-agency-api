const express = require('express');
require("dotenv").config();
const app = express();
const bodyParser = require('body-parser');
const { getOffersData } = require("./firebaseModule");

app.listen(3000, ()=> console.log("listening in 3000"));
app.use( function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', '*');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    //Off preflight request.
    res.setHeader('Access-Control-Max-Age', '600')

    next();
}, bodyParser.json());
app.use(express.static('public'));
app.use(express.json({ limit: '10mb' }));

app.get('/getDataFromFirebaseDB', (request, response ) => {
    const { databaseName } = request.query;

    getOffersData(databaseName)
        .then((data) => {
            console.log(data);

            response.json(data);
        })
        .catch((error) => {
            console.error('Error retrieving data:', error);
            response.status(500).json({ error: 'An error occurred' });
        });
});