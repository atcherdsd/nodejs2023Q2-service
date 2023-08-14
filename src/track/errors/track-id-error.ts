import { HttpException, HttpStatus } from '@nestjs/common';

export class TrackIDError extends HttpException {
  constructor() {
    super('Track ID is not valid', HttpStatus.BAD_REQUEST);
  }
}
