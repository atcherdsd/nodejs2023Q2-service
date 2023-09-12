import { ForbiddenException } from '@nestjs/common';

export class LoginError extends ForbiddenException {
  constructor() {
    super('Login or password is incorrect');
  }
}
