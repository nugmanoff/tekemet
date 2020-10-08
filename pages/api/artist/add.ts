import database from '@core/firebase/firebaseDatabase';

export default async (req, res) => {
  try {
    await database.addArtist(req.body);
    res.statusCode = 200;
    res.json({ message: 'Artist added successfully!' });
  } catch {
    res.statusCode = 500;
    res.json({ message: 'Something went wrong!' });
  }
};
