require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { getOffersData } = require('./firebaseModule.js');
const {deleteElement} = require("./firebaseModule");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use( function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Max-Age', '600')

    next();
}, bodyParser.json());
app.use(express.static('travel-agency-app'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/getDataFromFirebaseDB', (req, res ) => {
    const { databaseName } = req.query;

    getOffersData(databaseName)
        .then((data) => {
            console.log(data);

            res.json(data);
        })
        .catch((error) => {
            console.error('Error retrieving data:', error);
            res.status(500).json({ error: 'An error occurred' });
        });
});

app.delete('/delete/:collectionName/:elementId', (req, res) => {
    const collectionName = req.params.collectionName;
    const elementId = req.params.elementId;


    deleteElement(collectionName, elementId)
        .then(() => {
            res.status(200).json({ message: 'Element successfully deleted from the database.' });
        })
        .catch((error) => {
            console.error('Error deleting element:', error);
            res.status(500).json({ error: 'An error occurred while deleting the element.' });
        });
});

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});