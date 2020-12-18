import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})

export class AuthComponent{
  isAuth : boolean;
  isError : boolean;
  errorMessage : string;
  SignInForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private authService: AuthService, private router: Router) {
    this.authService.isAuth.subscribe((val) => {
      this.isAuth = val;
    });
  }

  ngOnInit() {
    this.isAuth = false;
    this.isError = false;
    this.errorMessage = '';
  }

  logIn() {
    this.authService.logIn(this.SignInForm.value)
      .subscribe(
        (next) => {
          console.log(next);
          
          this.isAuth = true;
          this.router.navigate(['/home']);
        },
        (error) => {
          console.log(error);
          this.isError = true;
          this.displayError(error);
          
        }
    );
  }
  
  displayError(msgErr : Object){
    
    this.errorMessage = JSON.parse(JSON.stringify(msgErr)).error.error;
    setTimeout(function() {this.isError = false; console.log(msgErr);
    }, 5000);

  }
}