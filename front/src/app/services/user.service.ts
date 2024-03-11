import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';
import {PostGet} from "../features/posts/interfaces/postGet.interface";
import {userUpdate} from "../interfaces/userUpdate.interface";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private pathService = 'api/users';

  constructor(private httpClient: HttpClient) { }

  public getById(id: string): Observable<User> {
    return this.httpClient.get<User>(`${this.pathService}/${id}`);
  }

  public updateUser(updatedUser: userUpdate): Observable<userUpdate> {
    return this.httpClient.put<userUpdate>(this.pathService, updatedUser);
  }
}
