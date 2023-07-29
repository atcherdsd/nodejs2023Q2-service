import { ErrorMessages } from 'src/utilities/enums';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { UpdatePasswordDto } from '../../user/dto/update-password.dto';
import { UserResponse } from '../../user/entities/user-response.entity';
import { User } from '../../user/entities/user.entity';

export interface Database {
  create: (body: CreateUserDto) => UserResponse;
  getUsers: () => UserResponse[];
  getUser: (id: string) => User;
  updatePassword: (
    id: string,
    body: UpdatePasswordDto,
  ) => UserResponse | ErrorMessages;
  delete: (id: string) => void | boolean;
}
