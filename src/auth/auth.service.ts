import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { UserResponse } from 'src/user/entities/user-response.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtData } from 'src/utilities/enums';
import { Tokens } from './interfaces/tokens';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  private async getUser(data: CreateUserDto) {
    const { login } = data;
    return await this.prisma.user.findFirst({
      where: { login },
    });
  }

  private async hashData(data: string) {
    const saltRounds = +this.configService.get(JwtData.CRYPT_SALT);
    return await bcrypt.hash(data, saltRounds);
  }

  private async getTokens(userId: string, login: string) {
    const payload = { sub: userId, login: login };
    const jwtAccessTokenOptions = {
      secret: this.configService.get(JwtData.JWT_SECRET_KEY),
      expiresIn: this.configService.get(JwtData.TOKEN_EXPIRE_TIME),
    };
    const jwtRefreshTokenOptions = {
      secret: this.configService.get(JwtData.JWT_SECRET_REFRESH_KEY),
      expiresIn: this.configService.get(JwtData.TOKEN_REFRESH_EXPIRE_TIME),
    };

    return {
      accessToken: await this.jwtService.signAsync(
        payload,
        jwtAccessTokenOptions,
      ),
      refreshToken: await this.jwtService.signAsync(
        payload,
        jwtRefreshTokenOptions,
      ),
    };
  }

  async signup(createAuthDto: CreateUserDto): Promise<UserResponse | boolean> {
    const alreadyExistingUser = await this.getUser(createAuthDto);
    if (alreadyExistingUser) {
      return false;
    }
    const hashedPassword = await this.hashData(createAuthDto.password);
    const newAddedUser: UserResponse = await this.userService.create({
      ...createAuthDto,
      password: hashedPassword,
    });
    return newAddedUser;
  }

  async login(createAuthDto: CreateUserDto) {
    const existingUser = await this.getUser(createAuthDto);
    const isPasswordsMatch = await bcrypt.compare(
      createAuthDto.password,
      existingUser.password,
    );
    if (!existingUser || !isPasswordsMatch) {
      return false;
    }

    const tokens: Tokens = await this.getTokens(
      existingUser.id,
      existingUser.login,
    );

    return tokens;
  }

  refreshToken(refreshTokenDto: RefreshTokenDto) {
    return refreshTokenDto;
  }
}
