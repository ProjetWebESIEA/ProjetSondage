import { Injectable } from '@angular/core';      
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';      
import { Observable } from 'rxjs';

@Injectable({      
   providedIn: 'root'      
})

export class AuthGuard implements CanActivate {     

   constructor(private router: Router) { }  

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      if (this.isLoggedIn())
      {
         return true;
      }
      else 
      {
         this.router.navigate(['/auth']);      
         return false;   
      }
   }

   isLoggedIn(): boolean {
      if (sessionStorage.getItem('access_token'))
      {  
         return true;      
      }    
      else
      {
         return false;
      }    
   }    
}    