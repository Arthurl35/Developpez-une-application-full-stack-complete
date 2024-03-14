import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';
import {userUpdate} from "../interfaces/userUpdate.interface";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private pathService = 'api/users';

  constructor(private httpClient: HttpClient) { }

  /**
   * Fetches a user by their ID.
   * @param id The ID of the user.
   * @returns An Observable of the user.
   */
  public getById(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.pathService}/${id}`);
  }

  /**
   * Updates a user.
   * @param updatedUser The updated user.
   * @returns An Observable of the updated user.
   */
  public updateUser(updatedUser: userUpdate): Observable<userUpdate> {
    return this.httpClient.put<userUpdate>(this.pathService, updatedUser);
  }
}
