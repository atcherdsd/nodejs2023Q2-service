import { UserResponse } from '../entities/user-response.entity';
import { User } from '../entities/user.entity';

export const removePassword = (user: User): UserResponse => {
  const { ...responseData } = user;
  delete responseData.password;
  const userResponse = responseData as UserResponse;
  return userResponse;
};
