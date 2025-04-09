import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iuser } from '../../../domain/entities/user.entities';
import { catchError, Observable } from 'rxjs';
import { environment } from '../../configurations/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  constructor(private http : HttpClient) { }

  register(user : Iuser): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, user)
      .pipe(catchError(error => {
        throw error;
      }));
  }

  login (email : string, password : string) {
    return this.http.post(`${this.apiUrl}/auth/login`, {
      email : email,
      password : password
    }).pipe(catchError(error => {
      throw error;
    }))
  }

  getToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('auth_token');
    }
    return null;
  }

  setToken(token : string): void {
     localStorage.setItem('auth_token', token);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  logout(): void {
    localStorage.removeItem('auth_token');
  }
}
