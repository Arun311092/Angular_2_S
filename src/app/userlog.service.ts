import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpErrorResponse, HttpParams } from '@angular/common/http';

import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Student } from './student';

@Injectable({
  providedIn: 'root'
})
export class UserlogService {

  private logstatus=false;
  private user;

  constructor(private http:HttpClient) { }

  getUserDetails(username, password){
    //console.log(username)
    return this.http.post('http://localhost/ap/auth.php', {
      username,
      password
    },
    {responseType: 'text'})
  }

  status:String;

  userval(){
    return this.http.post('http://localhost/ap/valid.php',{},{responseType: 'text'})
  }

  setstatus(){
    this.logstatus=true;
    //console.log('hi from service')
  }

  getstatus(){
    return this.logstatus;
  }
}
