const firebase = require('firebase/app');
require('firebase/firestore');
const { getFirestore, collection, getDocs, doc, deleteDoc } = require('firebase/firestore/lite');
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID
};
const app = firebase.initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const admin = require('firebase-admin');
const fs = require('fs');
const templateFile = fs.readFileSync('serviceAccountKey.json', 'utf8');
let jsonData = JSON.parse(templateFile);

jsonData.type = process.env.TYPE;
jsonData.project_id = process.env.PROJECT_ID;
jsonData.private_key_id = process.env.PRIVATE_KEY_ID;
jsonData.private_key = process.env.PRIVATE_KEY;
jsonData.client_email = process.env.CLIENT_EMAIL;
jsonData.client_id = process.env.CLIENT_ID;
jsonData.auth_uri = process.env.AUTH_URI;
jsonData.token_uri = process.env.TOKEN_URI;
jsonData.auth_provider_x509_cert_url = process.env.AUTH_PROVIDER_X509_CERT_URL;
jsonData.client_x509_cert_url = process.env.CLIENT_X509_CERT_URL;
jsonData.universe_domain = process.env.UNIVERSE_DOMAIN;

admin.initializeApp({
    credential: admin.credential.cert(jsonData)
});

const getOffersData = async (collectionName) => {
    try {
        const querySnapshot = await getDocs(collection(firestore, collectionName));
        const offersData = [];

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            offersData.push(data);
        });

        return offersData;
    } catch (error) {
        console.error('Error retrieving data:', error);
        return [];
    }
};

function deleteElement(collectionName, elementId) {
    const elementRef = doc(firestore, `${collectionName}/${elementId}`);

    return deleteDoc(elementRef);
}

module.exports = { getOffersData, deleteElement };