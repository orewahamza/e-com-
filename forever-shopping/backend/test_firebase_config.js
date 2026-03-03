
import 'dotenv/config';
import admin from 'firebase-admin';

const testFirebase = () => {
    try {
        console.log('Testing Firebase Config...');
        const projectId = process.env.FIREBASE_PROJECT_ID;
        const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
        let privateKey = process.env.FIREBASE_PRIVATE_KEY;

        console.log('Project ID:', projectId);
        console.log('Client Email:', clientEmail);
        console.log('Private Key Length:', privateKey ? privateKey.length : 'MISSING');

        if (!projectId || !clientEmail || !privateKey) {
            console.error('Missing Firebase credentials in .env');
            return;
        }

        // Simulate the logic in userController.js
        privateKey = privateKey.replace(/\\n/g, '\n');

        if (admin.apps.length === 0) {
            admin.initializeApp({
                credential: admin.credential.cert({ projectId, clientEmail, privateKey })
            });
            console.log('Firebase initialized successfully!');
        } else {
            console.log('Firebase already initialized.');
        }

    } catch (error) {
        console.error('Firebase Initialization Failed:', error);
    }
};

testFirebase();
