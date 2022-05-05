import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
signupForm!:FormGroup;
signupURL='http://localhost:8080/api/user/'
  constructor(private router:Router,private formBuilder:FormBuilder,private http:HttpClient,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      // firstName: ['', Validators.required],
      // lastName: ['', Validators.required],
      // email: ['', [Validators.required,Validators.email]],
      // password: ['',[ Validators.required,Validators.pattern('((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,30})')]],
      firstName: [''],
      lastName: [''],
      email: [''],
    password:['']
    });
  }
  signup(){
    this.http.post<any>(this.signupURL,this.signupForm.value).subscribe((data:any)=>{
      console.log(data);
      if(data.success){
      
      this.toastr.success("Sign up successfully !!",data.message  )
      this.router.navigate(['/login']);
      }         
      this.toastr.error("Login invalid",data.message  )
  })
 
  }

  changeinput(){

    let a=(document.getElementById('form3Example4')as HTMLInputElement).value
    if(a==""){
      (document.getElementById('check')as HTMLInputElement).innerHTML="password is required..."
    }else if(a.length<6){
      (document.getElementById('check')as HTMLInputElement).innerHTML="password must be 6 char..."
      
    }else if(/[0-9]/.test(a)!=true){
      (document.getElementById('check')as HTMLInputElement).innerHTML="password must 1 digit..."
      
    }
    else if(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(a)!=true){
      (document.getElementById('check')as HTMLInputElement).innerHTML="password must 1 symbol..."
      
    }else{
      (document.getElementById('check')as HTMLInputElement).innerHTML=""

    }
    


  }
}
