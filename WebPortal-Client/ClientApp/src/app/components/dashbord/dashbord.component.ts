import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import { LoginplaceService } from 'src/app/services/loginplace.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent {
  user: User[]  = [];
  constructor(
   private loginplaceService:LoginplaceService
  ) {}
  get username(){
    return this.loginplaceService.username;
  }
}
