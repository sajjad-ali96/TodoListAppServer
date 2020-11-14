import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl = "/api/register"
  private _loginUrl = "/api/login"

  constructor(private http: HttpClient ) { }

  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user)
  }

  loginUser(user) {
    return this.http.post<any>(this._loginUrl,user)
  }
}
