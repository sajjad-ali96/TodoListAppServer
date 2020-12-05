import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {environment} from '../environments/environment';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = environment.base_url[1];
  private _registerUrl = "/api/register"
  private _loginUrl = "/api/login"

  constructor(private http: HttpClient,
    private router: Router ) { }

  registerUser(user) {
    return this.http.post<any>(`${this.url}${this._registerUrl}`, user)
  }

  loginUser(user) {
    return this.http.post<any>(`${this.url}${this._loginUrl}`,user)
  }

  loggedIn() {
    return !!localStorage.getItem('token')
  }

  logoutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
  }

  getToken() {
    return localStorage.getItem('token')
  }

}
