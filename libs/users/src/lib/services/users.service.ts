import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { map, Observable } from "rxjs";
import { User } from "../models/user";


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiURLUsers = environment.apiURL + 'users';

  constructor(private http: HttpClient) { }

  //Get Users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiURLUsers);
  }

  //Get user by Id
  getUserById(userId: string): Observable<User>{
    return this.http.get<User>(`${this.apiURLUsers}/${userId}`);
  }

  //Create user
  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiURLUsers, user);
  }

  //Update user
  updateUser(user: User): Observable<User>{
    return this.http.put<User>(`${this.apiURLUsers}/${user.id}`, user);
  }

  //Delete user
  deleteUser(userId: string): Observable<User> {
    return this.http.delete<User>(`${this.apiURLUsers}/${userId}`);
  }

  //Get users count
  getUsersCount(): Observable<number> {
    return this.http
      .get<number>(`${this.apiURLUsers}/get/count`)
      .pipe(map((objectValue: any) => objectValue.userCount));
  }
}