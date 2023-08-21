import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
