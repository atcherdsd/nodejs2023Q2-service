import { Album, Artist, Track } from '@prisma/client';

export interface FavoritesPrismaResponse {
  artists: Omit<Artist, 'favoritesId'>[];
  albums: Omit<Album, 'favoritesId'>[];
  tracks: Omit<Track, 'favoritesId'>[];
}
