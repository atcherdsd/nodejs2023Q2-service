import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FavoritesPrismaResponse } from './interfaces/FavoritesPrismaResponse';

@Injectable()
export class FavsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<FavoritesPrismaResponse> {
    const [favs] = await this.prisma.favorites.findMany({
      select: {
        artists: {
          select: { id: true, name: true, grammy: true },
        },
        albums: {
          select: { id: true, name: true, year: true, artistId: true },
        },
        tracks: {
          select: {
            id: true,
            name: true,
            artistId: true,
            albumId: true,
            duration: true,
          },
        },
      },
    });
    return favs ? favs : { albums: [], artists: [], tracks: [] };
  }

  async addToFavs(id: string, modelType: string): Promise<void | boolean> {
    const entity = await this.prisma[modelType].findUnique({ where: { id } });
    if (!entity) return false;

    const favsIds = await this.prisma.favorites.findMany();
    if (!favsIds.length) {
      const initialFavs = await this.prisma.favorites.create({ data: {} });
      await this.prisma[modelType].update({
        where: { id },
        data: { favoritesId: initialFavs.id },
      });
    } else {
      await this.prisma[modelType].update({
        where: { id },
        data: { favoritesId: favsIds[0].id },
      });
    }
  }
  async removeFromFavs(id: string, modelType: string): Promise<void | boolean> {
    try {
      await this.prisma[modelType].update({
        where: { id },
        data: { favoritesId: { set: null } },
      });
    } catch {
      return false;
    }
  }
}
