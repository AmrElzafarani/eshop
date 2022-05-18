import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  setToken(data: any) {
    localStorage.setItem('user', data)
  }

  getToken() {
    return localStorage.getItem('user')
  }

  removeToken() {
    localStorage.removeItem('user')
  }
}
