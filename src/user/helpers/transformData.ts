import { UserResponse } from '../entities/user-response.entity';
import { IUser } from '../interfaces/interfaces';

export const transformData = (user: IUser): UserResponse => {
  const { createdAt, updatedAt, ...responseData } = user;
  delete responseData.password;
  return {
    createdAt: new Date(createdAt).getTime(),
    updatedAt: new Date(updatedAt).getTime(),
    ...responseData,
  };
};
