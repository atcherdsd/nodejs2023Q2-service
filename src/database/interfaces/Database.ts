import { ErrorMessages } from 'src/utilities/enums';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { UpdatePasswordDto } from '../../user/dto/update-password.dto';
import { UserResponse } from '../../user/entities/user-response.entity';
import { User } from '../../user/entities/user.entity';

export interface Database {
  createUser: (body: CreateUserDto) => UserResponse;
  getUsers: () => UserResponse[];
  getUser: (id: string) => User;
  updatePassword: (
    id: string,
    body: UpdatePasswordDto,
  ) => UserResponse | ErrorMessages;
  deleteUser: (id: string) => void | boolean;
}
