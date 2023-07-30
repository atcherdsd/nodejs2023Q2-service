import { Injectable } from '@nestjs/common';
import InMemoryDatabase from 'src/database/inMemoryDatabase';

@Injectable()
export class FavsService {
  constructor(private database: InMemoryDatabase) {}

  findAll() {
    return this.database.getFavs();
  }

  addTrackToFavs(id: string) {
    return this.database.addTrackToFavs(id);
  }
  removeTrackFromFavs(id: string) {
    return this.database.removeTrackFromFavs(id);
  }

  addAlbumToFavs(id: string) {
    return this.database.addAlbumToFavs(id);
  }
  removeAlbumFromFavs(id: string) {
    return this.database.removeAlbumFromFavs(id);
  }

  addArtistToFavs(id: string) {
    return this.database.addArtistToFavs(id);
  }
  removeArtistFromFavs(id: string) {
    return this.database.removeArtistFromFavs(id);
  }
}
