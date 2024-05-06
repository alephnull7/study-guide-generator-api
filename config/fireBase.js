/*
    Author: Gregory Smith
    Date: May 6, 2024
    Description: Responsible for initializing Firebase connections for validating credentials,
        creating users, updating users, and deleting users
*/

require('dotenv').config();
const { initializeApp } = require('firebase/app');
const { getAuth } = require('firebase/auth');
const admin = require('firebase-admin');

const firebaseConfig = {
    apiKey: process.env.FB_API_KEY,
    authDomain: process.env.FB_AUTH_DOMAIN,
    projectId: process.env.FB_PROJECT_ID,
    storageBucket: process.env.FB_STORAGE_BUCKET,
    messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
    appId: process.env.FB_APP_ID,
    measurementId: process.env.FB_MEASUREMENT_ID
};

const serviceAccount = {
    type: process.env.FB_TYPE,
    projectId: process.env.FB_PROJECT_ID,
    private_key_id: process.env.FB_PRIVATE_KEY_ID,
    private_key: Buffer.from(process.env.FB_PRIVATE_KEY, 'base64').toString('utf-8'),
    client_email: process.env.FB_CLIENT_EMAIL,
    client_id: process.env.FB_CLIENT_ID,
    auth_uri: process.env.FB_AUTH_URI,
    token_uri: process.env.FB_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FB_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FB_CLIENT_X509_CERT_URL,
    universe_domain: process.env.FB_UNIVERSE_DOMAIN
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize Firebase admin
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = { auth, admin };
