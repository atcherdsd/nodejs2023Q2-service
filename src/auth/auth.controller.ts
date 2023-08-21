import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PublicRoute } from './decorators/public.decorator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { SignupError } from './errors/signup-error';
import { LoginError } from './errors/login-error';

@PublicRoute()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() createAuthDto: CreateUserDto) {
    const result = await this.authService.signup(createAuthDto);

    if (typeof result === 'boolean') throw new SignupError();
    return result;
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() createAuthDto: CreateUserDto) {
    const result = await this.authService.login(createAuthDto);

    if (typeof result === 'boolean') throw new LoginError();
    return result;
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto);
  }
}
