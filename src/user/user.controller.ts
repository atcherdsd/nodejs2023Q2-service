import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
  ForbiddenException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { validate } from 'uuid';
import { IDIsInvalidError } from './errors/id-is-invalid';
import { UserNotFoundError } from './errors/user-not-found';
import { ErrorMessages } from 'src/utilities/enums';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!validate(id)) throw new IDIsInvalidError();
    const result = this.userService.findOne(id);

    if (typeof result === 'boolean') throw new UserNotFoundError();
    return result;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdatePasswordDto) {
    if (!validate(id)) throw new IDIsInvalidError();

    const result = this.userService.update(id, updateUserDto);
    if (result === ErrorMessages.NOT_FOUND) throw new UserNotFoundError();
    if (result === ErrorMessages.FORBIDDEN) throw new ForbiddenException();
    return result;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    if (!validate(id)) throw new IDIsInvalidError();

    const result = this.userService.remove(id);
    if (typeof result === 'boolean') throw new UserNotFoundError();
  }
}
