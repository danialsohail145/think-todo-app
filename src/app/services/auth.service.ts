import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getAuthUserData(){
    return JSON.parse(localStorage.getItem('user') || '');
  }

  getIdToken(){
    return JSON.parse(localStorage.getItem('idToken') || '');
  }
}
