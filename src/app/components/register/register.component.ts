import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

declare let particlesJS: any;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private _AuthService: AuthService, private _Router: Router) {}

  ngOnInit(): void {
    particlesJS.load('particles-js', 'assets/particlesjs-config.json');
  }
  erorrMsg: string = '';
  registerDone: string = '';
  registerForm: FormGroup = new FormGroup({
    first_name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10)
    ]),
    last_name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10)
    ]),
    age: new FormControl(null, [
      Validators.required,
      Validators.min(16),
      Validators.max(80)
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[a-zA-z0-9]{4,15}$/)
    ]),
  });
  register() {
    console.log(this.registerForm.value);
    this._AuthService.registerNewUser(this.registerForm.value).subscribe(
      (response) => {
        if (response.message == 'success') {
          this.registerDone = 'Register Success';
          this._Router.navigate(['/login'])
        }
      },
      (erorr) => {
        this.erorrMsg = erorr.message;
      }
    );
  }
}
