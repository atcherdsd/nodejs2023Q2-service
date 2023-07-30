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
import { Album } from 'src/album/entities/album.entity';
import { UpdateAlbumDto } from 'src/album/dto/update-album.dto';
import { CreateAlbumDto } from 'src/album/dto/create-album.dto';
import { Favorites } from 'src/favs/entities/fav.entity';
import { FavoritesResponse } from 'src/favs/interfaces/FavoritesResponse';

@Injectable()
class InMemoryDatabase implements Database {
  private users: User[] = [];
  private artists: Artist[] = [];
  private tracks: Track[] = [];
  private albums: Album[] = [];
  private favs: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

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

    this.tracks = this.tracks.map((track) => {
      if (track.artistId === artist.id) track.artistId = null;
      return track;
    });
    this.albums = this.albums.map((album) => {
      if (album.artistId === artist.id) album.artistId = null;
      return album;
    });
    this.favs.artists = this.favs.artists.map((index) => {
      if (index === artist.id) index = null;
      return index;
    });
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

    this.favs.tracks = this.favs.tracks.map((index) => {
      if (index === track.id) index = null;
      return index;
    });
  }

  createAlbum(albumDto: CreateAlbumDto): Album {
    const newAlbum = { ...albumDto, id: v4() } as Album;
    this.albums.push(newAlbum);
    return newAlbum;
  }
  getAlbums(): Album[] {
    return this.albums;
  }
  getAlbum(id: string) {
    return this.albums.find((album) => album.id === id);
  }
  updateAlbum(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = this.getAlbum(id);
    if (!album) return false;

    const updatedAlbumDto = {
      ...album,
      name: updateAlbumDto.name,
      year: updateAlbumDto.year,
      artistId: updateAlbumDto.artistId
        ? updateAlbumDto.artistId
        : album.artistId,
    } as Album;
    this.albums.map((album) => {
      return album.id === id ? updatedAlbumDto : album;
    });
    return updatedAlbumDto;
  }
  deleteAlbum(id: string) {
    const album = this.getAlbum(id);
    if (!album) return false;

    this.albums = this.albums.filter((album) => album.id !== id);

    this.tracks = this.tracks.map((track) => {
      if (track.albumId === album.id) track.albumId = null;
      return track;
    });
    this.favs.albums = this.favs.albums.map((index) => {
      if (index === album.id) index = null;
      return index;
    });
  }

  getFavs(): FavoritesResponse {
    const artists = this.artists.filter((artist) =>
      this.favs.artists.some((el) => el === artist.id),
    );
    const albums = this.albums.filter((album) =>
      this.favs.albums.some((el) => el === album.id),
    );
    const tracks = this.tracks.filter((track) =>
      this.favs.tracks.some((el) => el === track.id),
    );
    return { artists, albums, tracks };
  }
  addTrackToFavs(trackId: string): void | boolean {
    const track = this.getTrack(trackId);
    if (!track) return false;

    this.favs.tracks.push(track.id);
  }
  removeTrackFromFavs(id: string): void | boolean {
    const track = this.favs.tracks.find((index) => index === id);
    if (!track) return false;

    this.favs.tracks = this.favs.tracks.filter((index) => index !== id);
  }

  addAlbumToFavs(albumId: string): void | boolean {
    const album = this.getAlbum(albumId);
    if (!album) return false;

    this.favs.albums.push(album.id);
  }
  removeAlbumFromFavs(id: string): void | boolean {
    const album = this.favs.albums.find((index) => index === id);
    if (!album) return false;

    this.favs.albums = this.favs.albums.filter((index) => index !== id);
  }

  addArtistToFavs(artistId: string): void | boolean {
    const artist = this.getArtist(artistId);
    if (!artist) return false;

    this.favs.artists.push(artist.id);
  }
  removeArtistFromFavs(id: string): void | boolean {
    const artist = this.favs.artists.find((index) => index === id);
    if (!artist) return false;

    this.favs.artists = this.favs.artists.filter((index) => index !== id);
  }
}

export default InMemoryDatabase;
