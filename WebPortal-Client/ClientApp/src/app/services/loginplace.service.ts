import { Injectable } from '@angular/core';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginplaceService {

  constructor(
    private loginService:LoginService
  ) { }
  get islogedIn(){
    return this.loginService.recentuser !=null;
  }
  get username(){
    return this.loginService.recentuser?.username;
  }
  get token(){
    return this.loginService.recentuser?.token;
  }
  logout(){
    this.loginService.logout();
  }
}
