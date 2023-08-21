import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { validate } from 'uuid';
import { ArtistIDError } from './errors/artist-id-error';
import { ArtistNotFoundError } from './errors/artist-not-found';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    if (!validate(id)) throw new ArtistIDError();
    const result = await this.artistService.findOne(id);

    if (typeof result === 'boolean') throw new ArtistNotFoundError();
    return result;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    if (!validate(id)) throw new ArtistIDError();

    const result = await this.artistService.update(id, updateArtistDto);
    if (typeof result === 'boolean') throw new ArtistNotFoundError();
    return result;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    if (!validate(id)) throw new ArtistIDError();

    const result = await this.artistService.remove(id);
    if (typeof result === 'boolean') throw new ArtistNotFoundError();
  }
}
