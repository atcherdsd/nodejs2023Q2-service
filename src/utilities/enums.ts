export enum ErrorMessages {
  NOT_FOUND = 'Not found',
  FORBIDDEN = 'Forbidden',
}

export enum ModelTypes {
  Track = 'track',
  Album = 'album',
  Artist = 'artist',
}

export enum JwtData {
  CRYPT_SALT = 'CRYPT_SALT',
  JWT_SECRET_KEY = 'JWT_SECRET_KEY',
  JWT_SECRET_REFRESH_KEY = 'JWT_SECRET_REFRESH_KEY',
  TOKEN_EXPIRE_TIME = 'TOKEN_EXPIRE_TIME',
  TOKEN_REFRESH_EXPIRE_TIME = 'TOKEN_REFRESH_EXPIRE_TIME',
}
