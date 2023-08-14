import { HttpException, HttpStatus } from '@nestjs/common';

export class ArtistNotFoundError extends HttpException {
  constructor() {
    super('Artist not found', HttpStatus.NOT_FOUND);
  }
}
