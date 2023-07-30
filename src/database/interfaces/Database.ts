import { ErrorMessages } from 'src/utilities/enums';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { UpdatePasswordDto } from '../../user/dto/update-password.dto';
import { UserResponse } from '../../user/entities/user-response.entity';
import { User } from '../../user/entities/user.entity';
import { CreateArtistDto } from 'src/artist/dto/create-artist.dto';
import { Artist } from 'src/artist/entities/artist.entity';
import { UpdateArtistDto } from 'src/artist/dto/update-artist.dto';
import { CreateTrackDto } from 'src/track/dto/create-track.dto';
import { UpdateTrackDto } from 'src/track/dto/update-track.dto';
import { Track } from 'src/track/entities/track.entity';
import { CreateAlbumDto } from 'src/album/dto/create-album.dto';
import { UpdateAlbumDto } from 'src/album/dto/update-album.dto';
import { Album } from 'src/album/entities/album.entity';
import { FavoritesResponse } from 'src/favs/interfaces/FavoritesResponse';

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
  updateArtist: (id: string, body: UpdateArtistDto) => Artist | boolean;
  deleteArtist: (id: string) => void | boolean;

  createTrack: (body: CreateTrackDto) => Track;
  getTracks: () => Track[];
  getTrack: (id: string) => Track;
  updateTrack: (id: string, body: UpdateTrackDto) => Track | boolean;
  deleteTrack: (id: string) => void | boolean;

  createAlbum: (body: CreateAlbumDto) => Album;
  getAlbums: () => Album[];
  getAlbum: (id: string) => Album;
  updateAlbum: (id: string, body: UpdateAlbumDto) => Album | boolean;
  deleteAlbum: (id: string) => void | boolean;

  getFavs: () => FavoritesResponse;
  addTrackToFavs: (id: string) => void | boolean;
  removeTrackFromFavs: (id: string) => void | boolean;

  addAlbumToFavs: (id: string) => void | boolean;
  removeAlbumFromFavs: (id: string) => void | boolean;

  addArtistToFavs: (id: string) => void | boolean;
  removeArtistFromFavs: (id: string) => void | boolean;
}
