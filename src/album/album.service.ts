import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import InMemoryDatabase from 'src/database/inMemoryDatabase';

@Injectable()
export class AlbumService {
  constructor(private database: InMemoryDatabase) {}

  create(createAlbumDto: CreateAlbumDto) {
    return this.database.createAlbum(createAlbumDto);
  }

  findAll() {
    return this.database.getAlbums();
  }

  findOne(id: string) {
    const album = this.database.getAlbum(id);
    if (!album) return false;
    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    return this.database.updateAlbum(id, updateAlbumDto);
  }

  remove(id: string) {
    return this.database.deleteAlbum(id);
  }
}
