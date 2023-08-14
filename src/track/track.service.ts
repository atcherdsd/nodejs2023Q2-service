import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import InMemoryDatabase from 'src/database/inMemoryDatabase';

@Injectable()
export class TrackService {
  constructor(private database: InMemoryDatabase) {}

  create(createTrackDto: CreateTrackDto) {
    return this.database.createTrack(createTrackDto);
  }

  findAll() {
    return this.database.getTracks();
  }

  findOne(id: string) {
    const track = this.database.getTrack(id);
    if (!track) return false;
    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    return this.database.updateTrack(id, updateTrackDto);
  }

  remove(id: string) {
    return this.database.deleteTrack(id);
  }
}
