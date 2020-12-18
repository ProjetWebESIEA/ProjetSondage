import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable, of as observableOf, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from '../../../models/user/user.model';

@Injectable()
export class AuthService {
  user : Object;
  isAuth = new BehaviorSubject(false);
  

  constructor(private http:HttpClient) {
    this.isLoggedIn()
   }
  
  logIn(credentials : JSON) {
    return this.http.post('http://localhost:8080/api/auth/connexion', credentials)
    .pipe(tap((user) => 
    {
      if(user){
        this.isAuth.next(true);
        sessionStorage.setItem("access_token", JSON.parse(JSON.stringify(user)).accessToken);
        return user;
      }
      error => console.log(error);
    }));
  }

  register(credentials : JSON) {
    console.log(credentials);
    return this.http.post('http://localhost:8080/api/auth/inscription', credentials)
    .pipe(map((user) => {
      console.log(user);
      if(user){
        return "Inscription faite avec succes";
      }
    }));
  }

  updateUser(credentials : JSON) {
    console.log(credentials);
    return this.http.post('http://localhost:8080/api/user/updateAccount', credentials, {
      headers : new HttpHeaders().set('Authorization', "Bearer "+sessionStorage.getItem('access_token'))
  })
    .pipe(map((user) => {
      if(user){
        this.user = user;
        this.isAuth.next(true);
        //sessionStorage.setItem("currentUser", JSON.stringify(user));
        return user
      }
      error => console.log("here");
    }));
  }

    
  getOwn() {
    return this.http.get('http://localhost:8080/api/user/getOwn', {
      headers : new HttpHeaders().set('Authorization', "Bearer "+sessionStorage.getItem('access_token'))
  }).pipe(tap(
      (user) => 
      {
      if(user){
        console.log(user);
        this.isAuth.next(true);
        return user;
      }
    }));
  }

  signOut(){
    sessionStorage.removeItem("currentUser");
    this.isAuth.next(false);
  }

  isLoggedIn() {
    if (sessionStorage.getItem("access_token")) {
        this.isAuth.next(true);
        return true;
    } else {
        console.log("non connecte");
        this.isAuth.next(false);
        return false;
    }
    }
}