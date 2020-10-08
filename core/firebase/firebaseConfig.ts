import admin from 'firebase-admin';

class FirebaseConfig {
  public storage: admin.storage.Storage;
  public firestore: admin.firestore.Firestore;

  constructor() {
    try {
      const credentials = {
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      };
      admin.initializeApp({
        credential: admin.credential.cert(credentials),
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        databaseURL: process.env.FIREBASE_DATABASE_URL,
      });
      this.storage = admin.storage();
      this.firestore = admin.firestore();
    } catch (error) {
      /*
        We skip the "already exists" message which is
        not an actual error when we're hot-reloading.
      */
      if (!/already exists/u.test(error.message)) {
        console.error('Firebase admin initialization error', error.stack);
      }
    }
  }
}

export default new FirebaseConfig();
