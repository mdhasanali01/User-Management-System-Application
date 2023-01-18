import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent {
  constructor(private router:Router
    )
  { }
  isSent=false;
  email:string ='';
  onSubmit(f:NgForm){
    if(f.invalid) return;
    this.isSent=true;
    setTimeout(()=>{
      this.router.navigateByUrl("/login");
    }, 3000);
  }
}
