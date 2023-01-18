
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Comfirmpassword } from 'src/app/password/comfirmpassword';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
 
})
export class SignupComponent implements OnInit {
  disableSelect = new FormControl(false);
  public showPassword: boolean = false
  user:User = {};
    signupForm = new FormGroup({
    username: new FormControl('', Validators.required),
    fullname: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    dateofbirth: new FormControl(undefined, Validators.required),
    address: new FormControl('', Validators.required),
    mobilenumber: new FormControl('', [Validators.required, Validators.pattern(/^\d{5}[-]?\d{6}\r?$/)]),
    email: new FormControl('', [Validators.required,Validators.email]),
    pasword: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/)]),
    confirmpassword:new FormControl('', [Validators.required, Comfirmpassword('pasword')])
    
  })
  constructor(
    private userService:UserService,
    private messagenotify:MessageService,
    private datePipe:DatePipe,
    private router:Router
  ){}
  get f(){
    return this.signupForm.controls;
  }
  onSubmit(){
    if(this.signupForm.invalid) return;
   
    Object.assign(this.user, this.signupForm.value);
   
     this.user.dateofbirth = new Date( <string>this.datePipe.transform(this.user.dateofbirth, "yyyy-MM-dd"));
    this.userService.signup(this.user)
    .subscribe({
      next: x=>{
        console.log(x); 
        this.messagenotify.notify(x, 'Save data');       
         this.router.navigateByUrl('/login');
      },
      error: err=>console.log(err.message || err)
    })
  }
  usernamechange(event:any){
    if(this.f["username"].invalid) return;
    this.userService.checkUsername(event)
    .subscribe({
      next:r=> {
       
        if(r){
          this.signupForm.controls['username'].setErrors({
            notUnique: true
          })
        }
        else{
          this.signupForm.controls['username'].setErrors(null);
        }
      },
      error:err=> console.log(err.message||err)
    })
  }
  ngOnInit(): void { 
  }
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  emailchange(event:any){
    
    if(this.f["email"].invalid) return;
    // console.log(event);
    this.userService.checkEmail(event)
    .subscribe({
      next:r=>{
        if(r){
          console.log(r);
          this.signupForm.controls["email"].setErrors({
            notUnique: true
          })
        }
        else {
          this.signupForm.controls["email"].setErrors(null);
        }
      }
    })
  }
}
