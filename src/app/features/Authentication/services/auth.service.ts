import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from '../../../../env/env.dev';
import { LoginUser } from '../models/login-user';
import { RegisterData } from '../models/register-data';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: WritableSignal<boolean> = signal<boolean>(false);
  isDropdown = signal<boolean>(false)

  private readonly id = inject(PLATFORM_ID)
  constructor(private http: HttpClient) { }



  signUp(userData: RegisterData): Observable<any> {
    return this.http.post(env.BASE_URL + 'users/signup',
      {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        rePassword: userData.rePassword,
        dateOfBirth: userData.dateOfBirth,
        gender: userData.gender
      }
    )
  }
  signIn(userData: LoginUser): Observable<any> {
    return this.http.post(env.BASE_URL + 'users/signin',
      {
        email: userData.email,
        password: userData.password,

      }
    )
  }

  isBrowser(): boolean {
    return isPlatformBrowser(this.id);
  }

  saveToken(token: string) {
    if (this.isBrowser()) {
      localStorage.setItem('token', token);
    }
  }

  getToken(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem('token');
    }
    return null;
  }

  logout() {
    this.isLoggedIn.set(false);
    if (this.isBrowser()) {
      localStorage.removeItem('token');
    }
  }

  decodeToken() {
    const token = this.getToken();
    if (token) {
      return jwtDecode(token);
    }
    return null;

  }

  getLoggedUserData(): Observable<any> {
    const token = this.getToken();
    return this.http.get(env.BASE_URL + 'users/profile-data', {
      headers: {
        token: token!.toString()
      }
    })
  }

}
