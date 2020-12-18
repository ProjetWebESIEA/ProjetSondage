import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable, of as observableOf, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from '../../../models/user/user.model';

@Injectable()
export class VoteService {
  sondages =  new Object();
  isAuth = new BehaviorSubject(false);

  constructor(private http:HttpClient) {
    //this.isLoggedIn()
   }
  
  getOwnVotes() {
    return this.http.get('http://localhost:8080/api/vote/getMyVotes', {
        headers : new HttpHeaders().set('Authorization', "Bearer "+sessionStorage.getItem('access_token'))
    })
    .pipe(tap(
        (vote) => 
        {
        return vote;
        },
        (error) => {
          return error;
        })
    );
  }

  voter(voter : any) {
    return this.http.post(`http://localhost:8080/api/vote/vote`, voter, {
        headers : new HttpHeaders().set('Authorization', "Bearer "+sessionStorage.getItem('access_token')),
        responseType : "text"
    })
    .pipe(tap(
      (next) => 
    {
      return next;

    },
    (error) => {
      return error
    },
    () => {
      
    }
    )
    );
  }


  isLoggedIn() {
    if (sessionStorage.getItem("currentUser")) {
      var currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
      if (currentUser.civilite != null || currentUser.username != null || currentUser.nom != null || currentUser.prenom != null || currentUser.email != null || currentUser.password != null) {
        this.isAuth.next(true);
        return true;
    }
  } else {
      this.isAuth.next(false);
      return false;
    }
    }
}