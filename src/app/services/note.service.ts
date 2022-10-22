import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';



@Injectable({
  providedIn: 'root'
})
export class NoteService {
  editNote(editObj: { NoteID: string; token: string | null; }) {
    throw new Error('Method not implemented.');
  }

  baseURL : string = `https://route-egypt-api.herokuapp.com/`

  constructor(private _HttpClient:HttpClient , private _AuthService:AuthService) { };

  addNoteInService(obj:any):Observable<any>{
    return this._HttpClient.post(`${this.baseURL}addNote`,obj);
  };
  getUserNotes():Observable<any>{
    let id = this._AuthService.currentUser.getValue()._id;
    let token = localStorage.getItem("userToken");
    let headersObj = {
      token: <string>token,
      userID: id
    }
    return this._HttpClient.get(`${this.baseURL}getUserNotes`,{headers: headersObj});
  };
  deleteNote(obj:any):Observable<any>{
    return this._HttpClient.delete(`${this.baseURL}deleteNote`,{body:obj})
  }
  updateNote(obj:any):Observable<any>{
    return  this._HttpClient.put(`${this.baseURL}updateNote`,obj);
  }
  

}


