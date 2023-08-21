import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtData } from 'src/utilities/enums';
import { Request } from 'express';
import { PayloadToken, ValidateData } from '../interfaces/Tokens';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'refresh-jwt',
) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get(JwtData.JWT_SECRET_REFRESH_KEY),
      passReqToCallback: true,
    });
  }

  validate(request: Request, payload: PayloadToken): ValidateData {
    const refreshToken: string = request
      .get('authorization')
      .replace('Bearer', '')
      .trim();
    return { ...payload, refreshToken };
  }
}
