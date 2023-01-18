import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject, catchError, map, throwError } from 'rxjs';
import { Login } from '../models/login';
import { UserData } from '../models/user-data';

@Injectable({
  providedIn: 'root'
})
export class LoginService {  private recentuserSubject: BehaviorSubject<UserData | null>;
  @Output() loginEvent: EventEmitter<string> = new EventEmitter<string>();
 
  constructor(private http: HttpClient) {
   
    let data = sessionStorage.getItem('user-data');
    this.recentuserSubject = new BehaviorSubject<UserData | null>( data ? JSON.parse(data) : null);
  }
  login(data: Login) {
    
    
      let noTokenHeader = { headers: new HttpHeaders({ 'notoken': 'no token' }) }
    return this.http.post<UserData>(`http://localhost:8980/api/Account/Login`, data).pipe(
      map((r) => {
         this.save(r);
        this.recentuserSubject.next(r);
        return r;
      }),
      catchError((err, caught)=>{
        this.recentuserSubject.next(null);
          return throwError(()=> console.log(err));
      })
    );
    
      
  }
  get recentuser(){
    return this.recentuserSubject.value;
  }
  logout(){
    sessionStorage.removeItem("user-data");
    this.recentuserSubject.next(null);
    this.loginEvent.emit('logout');
  }
  save(data:UserData){
    sessionStorage.setItem("user-data", JSON.stringify(data));
  }
}