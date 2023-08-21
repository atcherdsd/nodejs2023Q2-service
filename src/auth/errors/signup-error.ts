import { ConflictException } from '@nestjs/common';

export class SignupError extends ConflictException {
  constructor() {
    super('Conflict. Login already exists');
  }
}
