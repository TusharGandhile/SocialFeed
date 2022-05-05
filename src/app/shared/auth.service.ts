import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
url:any="http://localhost:8080/api/"
  constructor(private http:HttpClient) { }
  isLoggedin(){    
    if(localStorage.getItem('token')){
      return true;
    }
    return false;
    
  }
userSignUp(body:any){
 
    return this.http.post<any>(this.url+"user/",body)
  
}
}
