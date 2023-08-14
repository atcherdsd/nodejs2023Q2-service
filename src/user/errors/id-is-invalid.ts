import { HttpException, HttpStatus } from '@nestjs/common';

export class IDIsInvalidError extends HttpException {
  constructor() {
    super('User ID is invalid', HttpStatus.BAD_REQUEST);
  }
}
