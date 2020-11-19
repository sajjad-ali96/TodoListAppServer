import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserData = {
    email:"",
    password:""
  }
  constructor(private _auth: AuthService,
    private router:Router) { }

  ngOnInit(): void {
  }

  registerUser() {
    this._auth.registerUser(this.registerUserData)
      .subscribe(
        res => {
          this.onSuccess();
          localStorage.setItem('token', res.token)
        },
        err => this.onError(err)
      )
  }

  onSuccess(){
    this.router.navigate(['login'])
  }
  onError(error){
    console.log(error)
  }

}
