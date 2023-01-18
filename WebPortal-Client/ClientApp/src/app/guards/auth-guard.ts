import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginplaceService } from '../services/loginplace.service';
import { MessageService } from '../services/message.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private toastService:MessageService,
    private loginStatusService:LoginplaceService,
    private router:Router
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.loginStatusService.islogedIn){
        this.toastService.notify("You must login to access this resource", "DISMISS");
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
      }
      else{
        return true;
      }
  }
  
}
