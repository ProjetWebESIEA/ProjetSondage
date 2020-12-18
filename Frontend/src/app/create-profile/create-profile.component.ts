import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss']
})
export class CreateProfileComponent implements OnInit {
  isAuth : boolean;
  SignInForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl(''),
    nom: new FormControl(''),
    prenom: new FormControl(''),
    civilite: new FormControl('')
  });

  constructor(private authService: AuthService, private router: Router) { 
    this.authService.isAuth.subscribe((val) => {
      this.isAuth = val;
    });
  }

  ngOnInit() {
  }

  register(){
    this.authService.register(this.SignInForm.value).subscribe({
      next: value => console.log(value),
      error: err => console.error(err),
      complete: () => this.router.navigate(['/home'])
    })
  }
}
