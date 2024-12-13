import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../components/auth/Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService:AuthService,private router : Router) {}

  canActivate(): boolean
     {
      if(this.authService.isLoggedIn())
      return true;
      else{
        this.router.navigate(['/Login']);
        return false; 

      }
     }
}
