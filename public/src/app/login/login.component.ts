import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {Router} from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';


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
    private router: Router, private snackbar: MatSnackBar) { }

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
    this.snackbar.open("Invalid Credentials !!", "close", { duration: 3000 } );
    // console.log(error)
    // if(error instanceof HttpErrorResponse) {
    //   if(error.status === 401) {
    //     this.router.navigate(['/register'])
    //   }
    // }
  }

}
