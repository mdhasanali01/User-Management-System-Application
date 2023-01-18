import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit{

  user: User = null!;
  genderstatus:{label:string, value:string}[] =[];
  profileForm = new FormGroup({
    fullname: new FormControl('', Validators.required),
    dateofbirth: new FormControl('', Validators.required),
    address: new FormControl('',Validators.required),
    mobilenumber: new FormControl('', [Validators.required, Validators.pattern(/^\d{5}[-]?\d{6}\r?$/)]),
    email: new FormControl('', [Validators.required,Validators.email]),
    
  })
  constructor(
    private userService: UserService,
    private toastService:MessageService,
    private activatedRoute: ActivatedRoute,
    private datePipe:DatePipe
    
  ) {}
  get f(){
    return this.profileForm.controls;
  }
  emailchange(event:any){
    
    if(this.f["email"].invalid) return;
    console.log(event);
    this.userService.checkEmail(event)
    .subscribe({
      next:r=>{
        if(r){
          console.log(r);
          this.profileForm.controls["email"].setErrors({
            notUnique: true
          })
        }
        else {
          this.profileForm.controls["email"].setErrors(null);
        }
      }
    })
  }
  onSubmit(){
    if(this.profileForm.invalid) return;
   
    Object.assign(this.user, this.profileForm.value);
   
    this.user.dateofbirth = new Date( <string>this.datePipe.transform(this.user.dateofbirth, "yyyy-MM-dd"));
    console.log(this.user)
    this.userService.update(this.user)
    .subscribe({
      next: r=>{
        console.log(r);
        this.toastService.notify('Data updated', 'DISMISS');
        
      },
      error: err=>console.log(err.message || err)
    })
  }
  ngOnInit(): void {
    let id: number = this.activatedRoute.snapshot.params['id'];
    //console.log(username);
    this.userService.get(id).subscribe({
      next: (r) => {
        this.user = r;
        this.user.picture = this.user.picture ?? '1.jpg';
        this.f['fullname'].patchValue(this.user.fullname ?? '');
        this.f['dateofbirth'].patchValue(this.user.dateofbirth?.toString() ?? null);
        this.f['address'].patchValue(this.user.address ?? '');
        this.f['mobilenumber'].patchValue(this.user.mobilenumber ?? '');
        this.f['email'].patchValue(this.user.email ?? '');
        
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
