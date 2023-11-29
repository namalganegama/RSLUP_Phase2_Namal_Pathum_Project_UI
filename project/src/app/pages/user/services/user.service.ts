
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://127.0.0.1:3000/api/v1/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get<User[]>(`${this.apiUrl}/all`);
  }

  // createUser(user: User): Observable<User> {
  //   return this.http.post<User>(`${this.apiUrl}/signup`, user);
  // }

  createUser(userData: any): Observable<any> {
    const apiUrl = `${this.apiUrl}/signup`;
    return this.http.post(apiUrl, userData);
  }

  updateUser(userId: number, updatedUserData:any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${userId}`,updatedUserData);
  }


  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId}`);
  }
}
