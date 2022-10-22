import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseURL:string = 'https://route-egypt-api.herokuapp.com/';
  currentUser = new BehaviorSubject<any>(null);
  constructor(private  _HttpClient:HttpClient) {
    if(localStorage.getItem('userToken') != null){
      this.setUserInfo();
    }else{
      this.removeUserInfo();
    }
   }

  setUserInfo(){
    let token = localStorage.getItem("userToken");
    this.currentUser.next( jwtDecode(<string>token ));
  }
  removeUserInfo(){
    localStorage.removeItem('userToken');
    this.currentUser.next(null);
  }
  
  registerNewUser(obj:any):Observable<any>{
    return  this._HttpClient.post(`${this.baseURL}signup`,obj);
  };
  loginUser(obj:any):Observable<any>{
    return  this._HttpClient.post(`${this.baseURL}signin`,obj);
  }
  
}
