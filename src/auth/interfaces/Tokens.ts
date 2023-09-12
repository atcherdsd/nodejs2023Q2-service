export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface PayloadToken {
  sub: string;
  login: string;
}

export interface ValidateData extends PayloadToken {
  refreshToken: string;
}
