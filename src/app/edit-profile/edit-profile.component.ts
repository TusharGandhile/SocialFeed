import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  editprofile!: FormGroup;
  currentUser: any = [];
  token: any = []
  img:any
  UpdateURL = 'http://localhost:8080/edit-profile/';
  UpdatedProfileURL = 'http://localhost:8080/api/user/';
  users: any = [];
  profile=true;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('currentUser')) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser')!)
      console.log(this.currentUser._id);

    }
    if (localStorage.getItem('token')) {
      this.token = JSON.parse(localStorage.getItem('token')!)
      console.log(this.token);

    }
    this.editprofile = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['',[ Validators.required,Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      gender: ['', Validators.required],
      bio: ['', Validators.required],
      photo: "",
      name: "",
      dob: ['', Validators.required],

    });

    this.http.get<any>(this.UpdatedProfileURL + this.currentUser._id, { headers: { "auth-token": this.token } }).subscribe((data: any) => {
      console.log(data);
      this.users = data.users;
      this.editprofile.patchValue(this.users);
    })
  }

  onFileChanged(event:any) {
    this.img = event.target.files[0];
    const formData=new FormData();
    formData.append("photo", event.target.files[0]);
    this.http.post<any>('http://localhost:8080/api/feed/upload',formData).subscribe((res:any)=>{
  console.log(res.message.path);
  this.img=res.message.path
  
  });
}
  updateUser() {
    this.editprofile.value.photo=this.img
    this.editprofile.value.name=this.editprofile.value.firstName+" "+this.editprofile.value.lastName
    console.log(this.editprofile.value);
    this.http.put(this.UpdatedProfileURL + this.currentUser._id, this.editprofile.value,{ headers: { "auth-token": this.token } }).subscribe((data: any) => {
      console.log(data);
      this.router.navigate(['/feed']);
      this.toastr.success("Profile Edited successfully !!", data.message)
    }
      , (err) => {
        this.toastr.error("Something went wrong !!", "Bad request")
      });
  }
  removeImage(){
    this.img='';
    this.profile=false;
  }
}
