import { ErrorMessages } from 'src/utilities/enums';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { UpdatePasswordDto } from '../../user/dto/update-password.dto';
import { UserResponse } from '../../user/entities/user-response.entity';
import { User } from '../../user/entities/user.entity';
import { CreateArtistDto } from 'src/artist/dto/create-artist.dto';
import { Artist } from 'src/artist/entities/artist.entity';
import { UpdateArtistDto } from 'src/artist/dto/update-artist.dto';

export interface Database {
  createUser: (body: CreateUserDto) => UserResponse;
  getUsers: () => UserResponse[];
  getUser: (id: string) => User;
  updatePassword: (
    id: string,
    body: UpdatePasswordDto,
  ) => UserResponse | ErrorMessages;
  deleteUser: (id: string) => void | boolean;

  createArtist: (body: CreateArtistDto) => Artist;
  getArtists: () => Artist[];
  getArtist: (id: string) => Artist;
  updateArtist: (id: string, body: UpdateArtistDto) => Artist;
  deleteArtist: (id: string) => void;
}
