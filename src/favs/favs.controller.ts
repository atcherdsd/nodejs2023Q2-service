import {
  Controller,
  Get,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Post,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { AlbumNotExistError } from './errors/album-not-exist';
import { ArtistNotExistError } from './errors/artist-not-exist';
import { TrackNotExistError } from './errors/track-not-exist';
import { TrackNotFoundError } from 'src/track/errors/track-not-found';
import { AlbumNotFoundError } from 'src/album/errors/album-not-found';
import { ArtistNotFoundError } from 'src/artist/errors/artist-not-found';
import { ModelTypes } from 'src/utilities/enums';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  findAll() {
    return this.favsService.findAll();
  }

  @Post('track/:id')
  async createTrackForFavs(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.favsService.addToFavs(id, ModelTypes.Track);
    if (typeof result === 'boolean') throw new TrackNotExistError();
  }
  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeTrackFromFavs(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.favsService.removeFromFavs(id, ModelTypes.Track);
    if (typeof result === 'boolean') throw new TrackNotFoundError();
  }

  @Post('album/:id')
  async createAlbumForFavs(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.favsService.addToFavs(id, ModelTypes.Album);
    if (typeof result === 'boolean') throw new AlbumNotExistError();
  }
  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAlbumFromFavs(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.favsService.removeFromFavs(id, ModelTypes.Album);
    if (typeof result === 'boolean') throw new AlbumNotFoundError();
  }

  @Post('artist/:id')
  async createArtistForFavs(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.favsService.addToFavs(id, ModelTypes.Artist);
    if (typeof result === 'boolean') throw new ArtistNotExistError();
  }
  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeArtistFromFavs(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.favsService.removeFromFavs(id, ModelTypes.Artist);
    if (typeof result === 'boolean') throw new ArtistNotFoundError();
  }
}
