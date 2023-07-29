import { Injectable } from '@nestjs/common';
import { UsersDatabase } from '../interfaces/UsersDatabase';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { v4 } from 'uuid';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { UserResponse } from '../entities/user-response.entity';
import { removePassword } from '../helpers/removePassword';
import { ErrorMessages } from 'src/utilities/enums';

@Injectable()
class InMemoryUsersDatabase implements UsersDatabase {
  private users: User[] = [];

  create(userDto: CreateUserDto): UserResponse {
    const newUser = {
      ...userDto,
      id: v4(),
      version: 1,
      createdAt: Date.now(),
    } as User;
    newUser.updatedAt = newUser.createdAt;
    this.users.push(newUser);
    const responseData = removePassword(newUser);
    return responseData;
  }

  getUsers(): UserResponse[] {
    const users = this.users.map((user) =>
      removePassword(user),
    ) as UserResponse[];
    return users;
  }

  getUser(id: string): User {
    return this.users.find((user) => user.id === id);
  }

  updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = this.getUser(id);
    if (!user) return ErrorMessages.NOT_FOUND;
    if (user.password !== updatePasswordDto.oldPassword)
      return ErrorMessages.FORBIDDEN;

    if (user.password !== updatePasswordDto.newPassword) {
      const updatedUserDto = {
        ...user,
        password: updatePasswordDto.newPassword,
        version: ++user.version,
        updatedAt: Date.now(),
      } as UpdateUserDto;
      return Object.assign(user, updatedUserDto);
    }
    return user;
  }

  delete(id: string) {
    const user = this.getUser(id);
    if (!user) return false;
    this.users = this.users.filter((user) => user.id !== id);
  }
}

export default InMemoryUsersDatabase;
