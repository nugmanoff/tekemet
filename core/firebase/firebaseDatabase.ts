import admin from 'firebase-admin';
import { IDatabase, IArtist } from '@core/database';
import config from './firebaseConfig';

class FirebaseDatabase implements IDatabase {
  private firestore: admin.firestore.Firestore;

  constructor() {
    this.firestore = config.firestore;
  }

  getAllArtists = async () => {
    const snapshot = await this.firestore.collection('artists').get();
    const artists = snapshot.docs.map((doc) => {
      return doc.data() as IArtist;
    });
    return artists;
  };

  addArtist = async (artist: IArtist) => {
    await this.firestore.collection('artists').add(artist);
  };
}

export default new FirebaseDatabase() as IDatabase;
