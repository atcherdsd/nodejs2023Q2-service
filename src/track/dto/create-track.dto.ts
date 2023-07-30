import {
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  ValidateIf,
} from 'class-validator';

export class CreateTrackDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDefined()
  @IsString()
  @ValidateIf((_obj, value) => value !== null)
  artistId: string | null; // refers to Artist

  @IsDefined()
  @IsString()
  @ValidateIf((_obj, value) => value !== null)
  albumId: string | null; // refers to Album

  @IsDefined()
  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  duration: number; // integer number
}
