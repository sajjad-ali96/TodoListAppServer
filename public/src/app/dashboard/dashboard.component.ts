import { Component, OnInit } from '@angular/core';
import { EventService } from "../event.service";
import {Router} from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  todos = [];

  inputText = '';

  constructor(private eventService: EventService,
    private router: Router, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.getTodoList()
  }
  
  addToList() {
    this.eventService.addTodoList(this.inputText)
      .subscribe(
        res => this.onSuccess(res),
        err => this.onError(err)
      )
      this.inputText = '';
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
    this.snackbar.open("Action Successfull !!", "close", { duration: 3000 } );
  }
  onError(error){
    console.log(error)
  }


}
