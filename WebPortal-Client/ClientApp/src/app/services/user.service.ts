import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  getAll():Observable<User[]>{
    return this.http.get<User[]>(`http://localhost:8980/api/User`)
  }
  get(id:number):Observable<User>{
    return this.http.get<User>(`http://localhost:8980/api/User/${id}`)
  }
  checkUsername(username:string):Observable<boolean>{
    return this.http.get<boolean>(`http://localhost:8980/api/Account/name/exists/${username}`)
  }
  checkEmail(email:string):Observable<boolean>{
    return this.http.get<boolean>(`http://localhost:8980/api/Account/email/exists/${email}`)
  }
  signup(data:User):Observable<any>{
    return this.http.post<any>(`http://localhost:8980/api/Account/signup`, data);
  }
  getByName(name:string):Observable<User>{
    return this.http.get<User>(`http://localhost:8980/api/User/name/${name}`)
  }
  update(user:User):Observable<any>{
    return this.http.put<any>(`http://localhost:8980/api/User/${user.userid}`, user)
  }
  
}
