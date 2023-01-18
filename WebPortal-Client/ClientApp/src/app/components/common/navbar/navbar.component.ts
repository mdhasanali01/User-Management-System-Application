import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginplaceService } from 'src/app/services/loginplace.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
    private loginStatusService:LoginplaceService,
    private router:Router
    ) {}
    get isLoggedIn(){
      return this.loginStatusService.islogedIn;
    }
    get username(){
      return this.loginStatusService.username;
    }
    logout(){
      this.loginStatusService.logout();
      this.router.navigate(['/home']);
    }
}
