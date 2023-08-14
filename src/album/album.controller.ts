import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumIDError } from './errors/album-id-error';
import { validate } from 'uuid';
import { AlbumNotFoundError } from './errors/album-not-found';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    if (!validate(id)) throw new AlbumIDError();
    const result = await this.albumService.findOne(id);

    if (typeof result === 'boolean') throw new AlbumNotFoundError();
    return result;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    if (!validate(id)) throw new AlbumIDError();

    const result = await this.albumService.update(id, updateAlbumDto);
    if (typeof result === 'boolean') throw new AlbumNotFoundError();
    return result;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    if (!validate(id)) throw new AlbumIDError();

    const result = await this.albumService.remove(id);
    if (typeof result === 'boolean') throw new AlbumNotFoundError();
  }
}
