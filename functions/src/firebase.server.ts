import * as admin from 'firebase-admin';
const serviceAccount =
  process.env.NODE_ENV === 'production'
    ? require('../serviceAccount.json')
    : require('../serviceAccount-staging.json');

if (!serviceAccount) {
  throw new Error('Error: Missing serviceAccount.json file');
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const db = admin.firestore();
