export class UserLoginLocalStorage{
  preferred_username: string;
  email: string;
  _token: string;
  _tokenExpirationDate: string;
  _refreshToken: string;
  _refreshTokenExpirationDate: string;


  constructor(preferred_username: string, email: string, token: string, tokenExpirationDate: string, refreshToken: string, refreshTokenExpirationDate: string) {
    this.preferred_username = preferred_username;
    this.email = email;
    this._token = token;
    this._tokenExpirationDate = tokenExpirationDate;
    this._refreshToken = refreshToken;
    this._refreshTokenExpirationDate = refreshTokenExpirationDate;
  }
}
