import { HttpException, HttpStatus } from '@nestjs/common';

export class AlbumIDError extends HttpException {
  constructor() {
    super('Album ID is not valid', HttpStatus.BAD_REQUEST);
  }
}
