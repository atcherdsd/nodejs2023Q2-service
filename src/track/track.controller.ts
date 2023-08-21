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
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackIDError } from './errors/track-id-error';
import { validate } from 'uuid';
import { TrackNotFoundError } from './errors/track-not-found';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    if (!validate(id)) throw new TrackIDError();
    const result = await this.trackService.findOne(id);

    if (typeof result === 'boolean') throw new TrackNotFoundError();
    return result;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    if (!validate(id)) throw new TrackIDError();

    const result = await this.trackService.update(id, updateTrackDto);
    if (typeof result === 'boolean') throw new TrackNotFoundError();
    return result;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    if (!validate(id)) throw new TrackIDError();

    const result = await this.trackService.remove(id);
    if (typeof result === 'boolean') throw new TrackNotFoundError();
  }
}
