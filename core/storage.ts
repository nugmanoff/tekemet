interface IStorageItem {
  filename: string;
  downloadUrl: string;
}

interface IStorage {
  getAllItems: () => Promise<IStorageItem[]>;
}

export type { IStorageItem, IStorage };
