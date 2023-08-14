import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserResponse } from './entities/user-response.entity';
import { transformData } from './helpers/transformData';
import { IUser } from './interfaces/interfaces';
import { ErrorMessages } from 'src/utilities/enums';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponse> {
    const newUser: IUser = await this.prisma.user.create({
      data: createUserDto,
    });
    const responseData = transformData(newUser) as UserResponse;
    return responseData;
  }

  async findAll(): Promise<UserResponse[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user) => transformData(user)) as UserResponse[];
  }

  async findOne(id: string): Promise<UserResponse | boolean> {
    const user: IUser = await this.prisma.user.findUnique({ where: { id } });
    if (!user) return false;
    const responseData = transformData(user) as UserResponse;
    return responseData;
  }

  async update(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<UserResponse | ErrorMessages> {
    const user: IUser = await this.prisma.user.findUnique({ where: { id } });
    if (!user) return ErrorMessages.NOT_FOUND;
    if (user.password !== updatePasswordDto.oldPassword)
      return ErrorMessages.FORBIDDEN;

    if (user.password !== updatePasswordDto.newPassword) {
      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: {
          password: updatePasswordDto.newPassword,
          version: {
            increment: 1,
          },
        },
      });
      const responseData = transformData(updatedUser) as UserResponse;
      return responseData;
    }
  }

  async remove(id: string): Promise<void | boolean> {
    try {
      await this.prisma.user.delete({ where: { id } });
    } catch {
      return false;
    }
  }
}
