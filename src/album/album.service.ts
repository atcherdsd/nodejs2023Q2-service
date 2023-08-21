import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    return await this.prisma.album.create({ data: createAlbumDto });
  }

  async findAll(): Promise<Album[]> {
    return await this.prisma.album.findMany();
  }

  async findOne(id: string): Promise<Album | boolean> {
    const album = await this.prisma.album.findUnique({ where: { id } });
    if (!album) return false;
    return album;
  }

  async update(
    id: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album | boolean> {
    try {
      return await this.prisma.album.update({
        where: { id },
        data: updateAlbumDto,
      });
    } catch {
      return false;
    }
  }

  async remove(id: string): Promise<void | boolean> {
    const album = await this.findOne(id);
    if (!album) return false;
    await this.prisma.album.delete({ where: { id } });
  }
}
