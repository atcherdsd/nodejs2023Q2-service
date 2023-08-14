import { HttpException, HttpStatus } from '@nestjs/common';

export class AlbumNotExistError extends HttpException {
  constructor() {
    super('Album does not exist', HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
