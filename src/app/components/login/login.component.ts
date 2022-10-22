import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';



declare let particlesJS: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private _AuthService:AuthService , private _Router:Router) {};
  loginForm : FormGroup = new FormGroup({
    email : new FormControl(null,[Validators.required,Validators.email]),
    password : new FormControl(null,[Validators.required,Validators.pattern(/^[a-zA-z0-9]{4,15}$/)])
    
  });
  erorrMsg: string = '';

  ngOnInit(): void {
    particlesJS.load('particles-js', 'assets/particlesjs-config.json');
  };
  login(){
    this._AuthService.loginUser(this.loginForm.value).subscribe(
      (response) => {
        console.log(response)
        if (response.message == 'success') {
          localStorage.setItem("userToken", response.token);
          this._AuthService.setUserInfo();
          this._Router.navigate(['/profile']);
        }else{
          this.erorrMsg =response.message;
        }
      },
      (erorr) => {this.erorrMsg = erorr.message}
    )
  }
}
