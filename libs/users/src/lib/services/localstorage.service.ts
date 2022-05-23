import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  setToken(data: any) {
    localStorage.setItem('user', data)
  }

  getToken() {
    return localStorage.getItem('user')
  }

  removeToken() {
    localStorage.removeItem('user')
  }

  isValidToken () {
    const token = this.getToken();
    if(token) {
      const tokenDecoded = JSON.parse(atob(token.split('.')[1]));
      return !this._tokenExpired(tokenDecoded.exp)
    } else {
      return false;
    }
  }

  getUserIdFromToken() {
    const token = this.getToken();
    if (token) {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      if (tokenDecode) {
        return tokenDecode.userId;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  private _tokenExpired(expirationDate: number): boolean {
    return Math.floor(new Date().getTime() / 1000) >= expirationDate;
  }
}
