import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    return await this.prisma.track.create({ data: createTrackDto });
  }

  async findAll(): Promise<Track[]> {
    return await this.prisma.track.findMany();
  }

  async findOne(id: string): Promise<Track | boolean> {
    const track = await this.prisma.track.findUnique({ where: { id } });
    if (!track) return false;
    return track;
  }

  async update(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<Track | boolean> {
    try {
      return await this.prisma.track.update({
        where: { id },
        data: updateTrackDto,
      });
    } catch {
      return false;
    }
  }

  async remove(id: string): Promise<void | boolean> {
    try {
      await this.prisma.track.delete({ where: { id } });
    } catch {
      return false;
    }
  }
}
