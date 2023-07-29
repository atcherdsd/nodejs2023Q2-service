import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import InMemoryUsersDatabase from './database/inMemoryUsersDatabase';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'UsersDatabase',
      useClass: InMemoryUsersDatabase,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
