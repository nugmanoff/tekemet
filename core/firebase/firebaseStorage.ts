import admin from 'firebase-admin';
import { IStorage } from '@core/storage';
import config from './firebaseConfig';

class FirebaseStorage implements IStorage {
  private storage: admin.storage.Storage;

  constructor() {
    this.storage = config.storage;
  }

  getAllItems = async () => {
    const [refs] = await this.storage.bucket().getFiles();
    const files = refs.map((ref) => {
      let downloadUrl = this.createPersistentDownloadUrl(
        ref.metadata.bucket,
        ref.metadata.name,
        ref.metadata.metadata.firebaseStorageDownloadTokens
      );
      return { filename: ref.name, downloadUrl };
    });
    return files;
  };

  private createPersistentDownloadUrl = (bucket, pathToFile, downloadToken) => {
    return `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(
      pathToFile
    )}?alt=media&token=${downloadToken}`;
  };
}

export default new FirebaseStorage() as IStorage;
