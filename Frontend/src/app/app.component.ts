import { Component } from '@angular/core';
import { NavbarModule, WavesModule, ButtonsModule } from 'angular-bootstrap-md'
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Dashboard';
  isLoggedIn: boolean = true;

  constructor(private authService: AuthService, private router: Router) { 

  }

  ngOnInit(){    
    this.authService.isAuth.subscribe((val) => {
    this.isLoggedIn = val;
  });
  }

  logOut(){
    this.authService.signOut();
    this.router.navigate(['/auth']);
  }
}
