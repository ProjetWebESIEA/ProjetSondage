import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable, of as observableOf, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from '../../../models/user/user.model';

@Injectable()
export class SondageService {
  sondages =  new Object();
  isAuth = new BehaviorSubject(false);

  constructor(private http:HttpClient) {
    //this.isLoggedIn()
   }
  
  getAll() {
    return this.http.get('http://localhost:8080/api/sondage/getAll', {
        headers : new HttpHeaders().set('Authorization', "Bearer "+sessionStorage.getItem('access_token'))
    })
    .pipe(tap((sondages) => 
    {
        console.log(sondages); 
        if(sondages){
            this.sondages = sondages;
            return sondages;
        }
      (error) => console.log(error);
    })
    );
  }

  deleteSondage(sondageId : number) {
    return this.http.delete(`http://localhost:8080/api/sondage/deleteById/${sondageId}`,{
        headers : new HttpHeaders().set('Authorization', "Bearer "+sessionStorage.getItem('access_token')),
        responseType : "text"
    })
    .pipe(tap(
      (sondages) => 
    {
      return sondages;

    },
    (error) => {
      return error
    },
    () => {
      
    }
    )
    );
  }

  addSondage(sondage : any) {
    return this.http.post(`http://localhost:8080/api/sondage/create`, sondage, {
        headers : new HttpHeaders().set('Authorization', "Bearer "+sessionStorage.getItem('access_token')),
        responseType : "text"
    })
    .pipe(tap(
      (sondages) => 
    { 
      return sondages;

    },
    (error) => {
      return error
    },
    () => {
      
    }
    )
    );
  }

  getLieux() {
    return this.http.get(`http://localhost:8080/api/sondage/getLieux`,{
        headers : new HttpHeaders().set('Authorization', "Bearer "+sessionStorage.getItem('access_token')),
    })
    .pipe(tap(
      (lieux) => 
    {
      return lieux;

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