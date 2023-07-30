import { Injectable } from '@nestjs/common';
import { Database } from './interfaces/Database';
import { User } from '../user/entities/user.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { v4 } from 'uuid';
import { UpdatePasswordDto } from '../user/dto/update-password.dto';
import { UserResponse } from '../user/entities/user-response.entity';
import { removePassword } from '../user/helpers/removePassword';
import { ErrorMessages } from 'src/utilities/enums';
import { Artist } from 'src/artist/entities/artist.entity';
import { CreateArtistDto } from 'src/artist/dto/create-artist.dto';
import { UpdateArtistDto } from 'src/artist/dto/update-artist.dto';
import { Track } from 'src/track/entities/track.entity';
import { CreateTrackDto } from 'src/track/dto/create-track.dto';
import { UpdateTrackDto } from 'src/track/dto/update-track.dto';

@Injectable()
class InMemoryDatabase implements Database {
  private users: User[] = [];
  private artists: Artist[] = [];
  private tracks: Track[] = [];

  createUser(userDto: CreateUserDto): UserResponse {
    const newUser = {
      ...userDto,
      id: v4(),
      version: 1,
      createdAt: Date.now(),
    } as User;
    newUser.updatedAt = newUser.createdAt;
    this.users.push(newUser);
    const responseData = removePassword(newUser);
    return responseData;
  }
  getUsers(): UserResponse[] {
    const users = this.users.map((user) =>
      removePassword(user),
    ) as UserResponse[];
    return users;
  }
  getUser(id: string): User {
    return this.users.find((user) => user.id === id);
  }
  updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = this.getUser(id);
    if (!user) return ErrorMessages.NOT_FOUND;
    if (user.password !== updatePasswordDto.oldPassword)
      return ErrorMessages.FORBIDDEN;

    if (user.password !== updatePasswordDto.newPassword) {
      const updatedUserDto = {
        ...user,
        password: updatePasswordDto.newPassword,
        version: ++user.version,
        updatedAt: Date.now(),
      } as UpdateUserDto;
      return Object.assign(user, updatedUserDto);
    }
    return user;
  }
  deleteUser(id: string) {
    const user = this.getUser(id);
    if (!user) return false;
    this.users = this.users.filter((user) => user.id !== id);
  }

  createArtist(artistDto: CreateArtistDto): Artist {
    const newArtist = { ...artistDto, id: v4() } as Artist;
    this.artists.push(newArtist);
    return newArtist;
  }
  getArtists(): Artist[] {
    return this.artists;
  }
  getArtist(id: string) {
    return this.artists.find((artist) => artist.id === id);
  }
  updateArtist(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = this.getArtist(id);
    if (!artist) return false;

    const updatedArtistDto = {
      ...artist,
      name: updateArtistDto.name,
      grammy: updateArtistDto.grammy,
    } as Artist;
    this.artists.map((artist) => {
      return artist.id === id ? updatedArtistDto : artist;
    });
    return updatedArtistDto;
  }
  deleteArtist(id: string) {
    const artist = this.getArtist(id);
    if (!artist) return false;
    this.artists = this.artists.filter((artist) => artist.id !== id);
  }

  createTrack(trackDto: CreateTrackDto): Track {
    const newTrack = { ...trackDto, id: v4() } as Track;
    this.tracks.push(newTrack);
    return newTrack;
  }
  getTracks(): Track[] {
    return this.tracks;
  }
  getTrack(id: string) {
    return this.tracks.find((track) => track.id === id);
  }
  updateTrack(id: string, updateTrackDto: UpdateTrackDto) {
    const track = this.getTrack(id);
    if (!track) return false;

    const updatedTrackDto = {
      ...track,
      name: updateTrackDto.name,
      duration: updateTrackDto.duration,
      artistId: updateTrackDto.artistId
        ? updateTrackDto.artistId
        : track.artistId,
      albumId: updateTrackDto.albumId ? updateTrackDto.albumId : track.albumId,
    } as Track;
    this.tracks.map((track) => {
      return track.id === id ? updatedTrackDto : track;
    });
    return updatedTrackDto;
  }
  deleteTrack(id: string) {
    const track = this.getTrack(id);
    if (!track) return false;
    this.tracks = this.tracks.filter((track) => track.id !== id);
  }
}

export default InMemoryDatabase;
