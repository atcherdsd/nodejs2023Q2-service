import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import InMemoryUsersDatabase from '../database/inMemoryDatabase';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { removePassword } from './helpers/removePassword';

@Injectable()
export class UserService {
  constructor(
    @Inject('UsersDatabase') private database: InMemoryUsersDatabase,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.database.create(createUserDto);
  }

  findAll() {
    return this.database.getUsers();
  }

  findOne(id: string) {
    const user = this.database.getUser(id);
    if (!user) return false;
    return removePassword(user);
  }

  update(id: string, updateUserDto: UpdatePasswordDto) {
    const result = this.database.updatePassword(id, updateUserDto);
    if (typeof result !== 'string') return removePassword(result);
    return result;
  }

  remove(id: string) {
    return this.database.delete(id);
  }
}
