import { LocalizedString } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(): Promise<boolean> {
    return new Promise((resolve) => {
      localStorage.setItem('loggedIn', 'true');
      resolve(true);
    })
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('loggedIn') === 'true';
  }
}
