import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  ValidationPipe,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { PublicRoute } from './decorators/public.decorator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { LoginError } from './errors/login-error';
import { RefreshTokenGuard } from './guards/refresh-token.guard';

@PublicRoute()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signup(@Body() createAuthDto: CreateUserDto) {
    return this.authService.signup(createAuthDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() createAuthDto: CreateUserDto) {
    const result = await this.authService.login(createAuthDto);

    if (typeof result === 'boolean') throw new LoginError();
    return result;
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshToken(
    @Body(
      new ValidationPipe({
        exceptionFactory: () => {
          return new UnauthorizedException('No valid refresh token provided');
        },
      }),
    )
    refreshTokenDto: RefreshTokenDto,
  ) {
    return this.authService.refreshToken(refreshTokenDto);
  }
}
