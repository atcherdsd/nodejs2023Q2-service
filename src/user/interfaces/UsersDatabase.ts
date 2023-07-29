import { ErrorMessages } from 'src/utilities/enums';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { UserResponse } from '../entities/user-response.entity';
import { User } from '../entities/user.entity';

export interface UsersDatabase {
  create: (body: CreateUserDto) => UserResponse;
  getUsers: () => UserResponse[];
  getUser: (id: string) => User;
  updatePassword: (
    id: string,
    body: UpdatePasswordDto,
  ) => UserResponse | ErrorMessages;
  delete: (id: string) => void | boolean;
}
