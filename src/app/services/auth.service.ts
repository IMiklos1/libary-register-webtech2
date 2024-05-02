import { inject, Injectable } from '@angular/core';
import { AccessTokenDTO, LoginDTO, SignupDto } from '../models/auth';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private TOKEN_KEY = 'accessToken';
  http = inject(HttpClient);
  path = "http://localhost:3000";

  constructor() { }

  setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  removeToken() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  login(data: LoginDTO) {
    return this.http.post<AccessTokenDTO>(this.path + '/api/login', data);
  }
  
  signup(user: SignupDto){
    return this.http.post<AccessTokenDTO>(this.path + '/api/signUp', user);
  }

}