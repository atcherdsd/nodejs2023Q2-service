import { HttpException, HttpStatus } from '@nestjs/common';

export class ArtistIDError extends HttpException {
  constructor() {
    super('Artist ID is not valid', HttpStatus.BAD_REQUEST);
  }
}
