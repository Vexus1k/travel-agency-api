const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore/lite');

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

const getOffersData = async (database) => {
    try {
        const querySnapshot = await getDocs(collection(firestore, database));
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

module.exports = { getOffersData };