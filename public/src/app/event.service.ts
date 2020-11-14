import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private _dashboardUrl = "/api/dasboard"

  constructor(private http: HttpClient) { }

  getDashboard() {
    return this.http.get<any>(this._dashboardUrl)
  }

}
