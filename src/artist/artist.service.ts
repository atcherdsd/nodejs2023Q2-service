import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import InMemoryDatabase from 'src/database/inMemoryDatabase';

@Injectable()
export class ArtistService {
  constructor(private database: InMemoryDatabase) {}

  create(createArtistDto: CreateArtistDto) {
    return this.database.createArtist(createArtistDto);
  }

  findAll() {
    return this.database.getArtists();
  }

  findOne(id: string) {
    const artist = this.database.getArtist(id);
    if (!artist) return false;
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    return this.database.updateArtist(id, updateArtistDto);
  }

  remove(id: string) {
    return this.database.deleteArtist(id);
  }
}
