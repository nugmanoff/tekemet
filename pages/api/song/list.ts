import storage from '@core/firebase/firebaseStorage';

export default async (req, res) => {
  try {
    const files = await storage.getAllItems();
    res.json(files);
  } catch {
    res.statusCode = 500;
    res.json({ message: 'Something went wrong!' });
  }
};
