import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginplaceService } from '../services/loginplace.service';

@Injectable()
export class HttpinterceptorInterceptor implements HttpInterceptor {

  constructor(
    private loginSatatusService:LoginplaceService
  ) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(this.loginSatatusService.islogedIn){
      let token = this.loginSatatusService.token;
      if(token){
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        })
      }
    }
    return next.handle(req);
  }
}
