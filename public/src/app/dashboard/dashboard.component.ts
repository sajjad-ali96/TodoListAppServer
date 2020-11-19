import { Component, OnInit } from '@angular/core';
import { EventService } from "../event.service";
import {Router} from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  todos = [];

  inputText = '';

  constructor(private eventService: EventService,
    private router: Router) { }

  ngOnInit(): void {
    this.getTodoList()
  }
  
  addToList() {
    this.eventService.addTodoList(this.inputText)
      .subscribe(
        res => this.onSuccess(res),
        err => this.onError(err)
      )
      this.getTodoList();
  }

  editTodoList(_id,text) {
    this.eventService.updateTodoList(text)
      .subscribe(
        res => this.onSuccess(res),
        err => this.onError(err)
      )
    console.log(this.todos)
  }

  deleteTodoList(_id) {
    this.eventService.deleteTodoList(_id)
      .subscribe(
        res => this.onSuccess(res),
        err => this.onError(err)
      )
      this.getTodoList();
  }


  getTodoList() {
    this.todos = [];
    this.eventService.getTodo()
    .subscribe(res => {
      res.forEach(element => {
        this.todos.push(element)
      });
    });
  }

  onSuccess(res){
    alert("Action Successfull !!")
  }
  onError(error){
    console.log(error)
  }


}
