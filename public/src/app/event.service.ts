import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  url = environment.api_url;
  private _dashboardUrl = "dasboard"
  private _todoUrl = "getTodo"
  private _addTodo = "addTodo"
  private _updateTodo = "updateTodo"
  private _deleteTodo = "deleteTodo"

  constructor(private http: HttpClient) { }

  getDashboard() {
    return this.http.get<any>(`${this.url}/${this._dashboardUrl}`)
  }

  getTodo() {
    return this.http.get<any>(`${this.url}/${this._todoUrl}`)
  }

  addTodoList(payload) {
    let obj = {
      text: payload
    }
    return this.http.post<any>(`${this.url}/${this._addTodo}`, obj)
  }

  updateTodoList(payload) {
    let obj = {
      text : payload,
      id : payload
    }
    return this.http.post<any>(`${this.url}/${this._updateTodo}`, obj)
  }

  deleteTodoList(payload) {
    let obj = {
      id : payload
    }
    return this.http.post<any>(`${this.url}/${this._deleteTodo}`, obj)
  }



}
