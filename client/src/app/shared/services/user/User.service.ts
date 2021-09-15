import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/User.model';
import { environment } from 'src/environments/environment';
import { DataService } from '../common/data.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient, private data: DataService) {}

  createUserService(user: any) {
    return this.http.post(`${environment.serverUrl}/user-create`, user);
  }

  loginUserService(username: string, password: string) {
    return this.http.post(`${environment.serverUrl}/user-login`, {
      username,
      password,
    });
  }

  getUser() {
    let user = localStorage.getItem('user');
    return JSON.parse(user || '{}');
  }

  get loggedUser() {
    return JSON.parse(localStorage.getItem('user') || '{}') || new User();
  }

  isAuthenticated() {
    const token = localStorage.getItem('token');

    return token != null;
  }
  isAdministrator() {
    const userData = localStorage.getItem('user');

    if (userData != null) {
      const user = JSON.parse(userData);

      return user.uloga_id == '2';
    }

    return false;
  }

  getAllUsersService() {
    return this.http.get(environment.serverUrl + '/get-all-users');
  }

  deleteUser(body: any) {
    return this.http.put(
      environment.serverUrl + '/user-delete/' + parseInt(body['user_id']),
      body
    );
  }

  editUser(body: any) {
    console.log(body);
    return this.http.put(
      environment.serverUrl + '/user-role-change/' + parseInt(body['uloga_id']),
      body
    );
  }

  getRoleType() {
    return this.http.get(environment.serverUrl + '/get-role-type');
  }

  countUsers() {
    this.http
      .get(environment.serverUrl + '/users-count')
      .subscribe((success: any) => {
        this.data.updateUsersCounter(success.numOfUsers);
        return success.numOfUsers;
      });
  }

  //reset request
  checkIfUserExist(identifier: string) {
    return this.http.get(
      environment.serverUrl + '/check-if-user-exist/' + identifier
    );
  }

  resetPassword(body: any) {
    return this.http.put(environment.serverUrl + '/set-new-password', body);
  }

  updateUser(body: any) {
    return this.http.put(environment.serverUrl + '/user-update', body);
  }

  getUserById(id: any) {
    return this.http.get(environment.serverUrl + '/get-user-by-id/' + id);
  }
}
