import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signIn(params: SignIn): Observable<any> {
    const loginUrl = 'http://127.0.0.1:3000/api/v1/users/login';

    return this.http.post(loginUrl, params).pipe(
      catchError((error) => {
        console.error('Error:', error);
        return throwError('An error occurred during login.');
      })
    );
  }

  register(params: SignIn): Observable<any> {
    const registerUrl = 'http://127.0.0.1:3000/api/v1/users/signup';

    return this.http.post(registerUrl, params).pipe(
      catchError((error) => {
        console.error('Registration Error:', error);
        return throwError('An error occurred during registration.');
      })
    );
  }

}

type SignIn = {
  email: string;
  password: string;
};
