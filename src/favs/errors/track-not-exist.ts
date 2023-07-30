import { HttpException, HttpStatus } from '@nestjs/common';

export class TrackNotExistError extends HttpException {
  constructor() {
    super('Track does not exist', HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
