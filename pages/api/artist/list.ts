import database from '@core/firebase/firebaseDatabase';

export default async (req, res) => {
  try {
    const artists = await database.getAllArtists();
    res.statusCode = 200;
    res.json(artists);
  } catch {
    res.statusCode = 500;
    res.json({ message: 'Something went wrong!' });
  }
};
