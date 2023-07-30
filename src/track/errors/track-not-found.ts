import { HttpException, HttpStatus } from '@nestjs/common';

export class TrackNotFoundError extends HttpException {
  constructor() {
    super('Track not found', HttpStatus.NOT_FOUND);
  }
}
