require('dotenv').config();

/** UNABLE_TO_GET_ISSUER_CERT_LOCALLY fix**/
// const syswidecas = require('syswide-cas');
// syswidecas.addCAs('/System/Volumes/Data/opt/homebrew/etc/ca-certificates/');

const express = require('express');
const functions = require('firebase-functions');
const app = express();
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
//cloud functions
const credential = require('../client/functions/rylllc-firebase-adminsdk-l3pfk-04cc2063c0.json');
const admin = require('firebase-admin');
admin.initializeApp({credential: admin.credential.cert(credential)});
const db = admin.firestore();
//CORS
const cors = require('cors')({origin: '*'});
app.use(cors);

// Middleware to log every request
app.use((req, res, next) => {
    if (req.method !== 'OPTIONS')
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// const cors = require('cors');
// const corsOptions = {
//     origin: true,
//     methods: "GET,PUT,POST,OPTIONS,DELETE",
//     allowedHeaders: "Origin,X-Requested-With,Content-type,Accept,X-Access-Token,X-Key,cache-control,X-Voice-Token",
//     credentials: true,
//     maxAge: 3600
// };
// app.use(cors(corsOptions));

// app.use(express.json());

app.use('/', [require('./routes')]);




const options = {
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
};

const httpsServer = https.createServer(options, app);
httpsServer.listen(443, () => {
    console.log('HTTPS Server running on https://localhost:443/');
});

// const httpServer = http.createServer(app);
// httpServer.listen(3000, () => {
//     console.log(`Server started on port 3000`);
// })



exports.app = functions.https.onRequest(app);
