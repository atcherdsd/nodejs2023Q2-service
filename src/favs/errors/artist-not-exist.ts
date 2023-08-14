import { HttpException, HttpStatus } from '@nestjs/common';

export class ArtistNotExistError extends HttpException {
  constructor() {
    super('Artist does not exist', HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
