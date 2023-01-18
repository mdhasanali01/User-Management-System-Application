import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { LoginplaceService } from 'src/app/services/loginplace.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users:User[] =[];
  @ViewChild(MatPaginator, {static:false}) paginator!: MatPaginator;
  columnList:string[] =['username','fullname','gender', 'dateofbirth', 'address', 'mobilenumber', 'email'];
  dataSource:MatTableDataSource<User> = new MatTableDataSource(this.users);
    constructor(
          private userService:UserService,
          private loginplaceService:LoginplaceService,
          private activatedRoute: ActivatedRoute
    ){
    }
    get username(){
      return this.loginplaceService.username;
    }
  ngOnInit(): void { 
  this.userService.getAll().subscribe({
    next: (r) => {
      this.users = r;
      this.dataSource.data = this.users;
      this.dataSource.paginator = this.paginator
    },
    error: (err) => {
      console.log(err);
    },
  });
  }
}