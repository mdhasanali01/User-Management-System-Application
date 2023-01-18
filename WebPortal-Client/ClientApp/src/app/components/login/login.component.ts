import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login';
import { UserData } from 'src/app/models/user-data';
import { LoginService } from 'src/app/services/login.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public showPassword: boolean = false
  model:Login ={};
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    pasword: new FormControl('', Validators.required)
   
  });
  constructor(
    private loginService:LoginService,
    private messageService:MessageService,
    private router:Router
  ){}
  get f(){
    return this.loginForm.controls;
  }
  onSubmit(){
    if(this.loginForm.invalid) return;
    Object.assign(this.model, this.loginForm.value);
    this.loginService.login(this.model)
    .subscribe({
      next:r=>{
        console.log(r.username)
        this.router.navigate(['/dashbord']);
      },
      error: err=>{
        this.messageService.notify('Login failed. check username or Password.', 'DISMISS')
      }
    });
      
  }
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  userLoggedIn(data?:UserData):void{
    console.log(data);
  }
}
