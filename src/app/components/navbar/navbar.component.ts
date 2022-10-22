import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn:boolean = false;

  constructor(private _AuthService:AuthService , private _Router:Router) { }

  ngOnInit(): void {
    this._AuthService.currentUser.subscribe(
      ()=>{
        if(this._AuthService.currentUser.getValue() == null){
          this.isLoggedIn = false;
        }else{
          this.isLoggedIn = true;
        }
      }
    );
   
  }
  logout(){
    this._AuthService.removeUserInfo();
    this._Router.navigate(['/login']);
  }

}
