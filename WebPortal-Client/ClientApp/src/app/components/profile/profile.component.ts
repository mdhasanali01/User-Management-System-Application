import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

  export class ProfileComponent implements OnInit {
    
    user:User =null!;
      constructor(
            private userService:UserService,
            private activatedRoute: ActivatedRoute,
            private messageservice:MessageService
      ){
      }
    
    ngOnInit(): void {
      let username: string = this.activatedRoute.snapshot.params['name'];
    this.userService.getByName(username).subscribe({
      next: (r) => {
        this.user = r;
        this.user.picture = this.user.picture ?? '1.jpg';
      },
      error: (err) => {
        console.log(err);
      },
    });
    }
}
