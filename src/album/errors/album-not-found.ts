import { HttpException, HttpStatus } from '@nestjs/common';

export class AlbumNotFoundError extends HttpException {
  constructor() {
    super('Album not found', HttpStatus.NOT_FOUND);
  }
}
