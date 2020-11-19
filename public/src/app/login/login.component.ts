import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData = {
    email:"",
    password:""
  }
  constructor(private _auth: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  loginUser() {
    this._auth.loginUser(this.loginUserData)
      .subscribe(
        res => {
          this.onSuccess();
          localStorage.setItem('token', res.token)
        }, 
        err => this.onError(err)
      )
  }

  onSuccess(){
    this.router.navigate(['dashboard'])
  }
  onError(error){
    console.log(error)
  }

}
