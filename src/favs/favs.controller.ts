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

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  findAll() {
    return this.favsService.findAll();
  }

  @Post('track/:id')
  createTrackForFavs(@Param('id', ParseUUIDPipe) id: string) {
    const result = this.favsService.addTrackToFavs(id);
    if (typeof result === 'boolean') throw new TrackNotExistError();
  }
  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrackFromFavs(@Param('id', ParseUUIDPipe) id: string) {
    const result = this.favsService.removeTrackFromFavs(id);
    if (typeof result === 'boolean') throw new TrackNotFoundError();
  }

  @Post('album/:id')
  createAlbumForFavs(@Param('id', ParseUUIDPipe) id: string) {
    const result = this.favsService.addAlbumToFavs(id);
    if (typeof result === 'boolean') throw new AlbumNotExistError();
  }
  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbumFromFavs(@Param('id', ParseUUIDPipe) id: string) {
    const result = this.favsService.removeAlbumFromFavs(id);
    if (typeof result === 'boolean') throw new AlbumNotFoundError();
  }

  @Post('artist/:id')
  createArtistForFavs(@Param('id', ParseUUIDPipe) id: string) {
    const result = this.favsService.addArtistToFavs(id);
    if (typeof result === 'boolean') throw new ArtistNotExistError();
  }
  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtistFromFavs(@Param('id', ParseUUIDPipe) id: string) {
    const result = this.favsService.removeArtistFromFavs(id);
    if (typeof result === 'boolean') throw new ArtistNotFoundError();
  }
}
