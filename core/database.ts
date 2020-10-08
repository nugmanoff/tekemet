interface IArtist {
  artistId: string;
  title: string;
}

interface IDatabase {
  getAllArtists: () => Promise<IArtist[]>;
  addArtist: (artist: IArtist) => Promise<void>;
}

export type { IDatabase, IArtist };
