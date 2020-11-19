import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import {environment} from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = environment.base_url;
  private _registerUrl = "/api/register"
  private _loginUrl = "/api/login"

  constructor(private http: HttpClient ) { }

  registerUser(user) {
    return this.http.post<any>(`${this.url}${this._registerUrl}`, user)
  }

  loginUser(user) {
    return this.http.post<any>(`${this.url}${this._loginUrl}`,user)
  }
}
