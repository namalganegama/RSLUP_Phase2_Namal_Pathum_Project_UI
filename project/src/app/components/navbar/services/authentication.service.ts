import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly jwtTokenKey = 'jwt_token';
  private readonly apiUrl = 'http://127.0.0.1:3000/api/v1/users'; 


  constructor(
    private http: HttpClient,
    private auth: AngularFireAuth
  ) { }

  logout(): Observable<void> {
    return from(this.auth.signOut());
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem(this.jwtTokenKey, response.token);
        }
      }),
      catchError(error => {
        
        return error(error);
      })
    );
  }

  getAuthToken(): string | null {
    return localStorage.getItem(this.jwtTokenKey);
  }

}