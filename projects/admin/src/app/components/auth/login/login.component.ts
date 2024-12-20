import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import { LoginRequest } from '../Models/login-request';
import { Observable } from 'rxjs';
import { UserDbStoreService } from '../Services/user-db-store.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit  {
  adminLogin: FormGroup;

  constructor( private fb: FormBuilder,private authService :AuthService,private router:Router
    ,private userStore:UserDbStoreService
   ) {
    this.adminLogin = this.fb.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
  ngOnInit(): void {
   this.onSubmit();
  }



  get login() {
    return this.adminLogin.get('login');
  }

  get password() {
    return this.adminLogin.get('password');
  }
  onSubmit(){
  if (this.adminLogin.valid) {
    console.log(this.adminLogin.value);
    alert("Hello World");
   // this.authService.storeToken('Zidan');

  //  console.log("Zidan");
   // this.router.navigate(['/Home']);

    this.authService.login(this.adminLogin.value).subscribe({
      next : (res)=> {
        alert(res.message);
        this.authService.storeToken(res.token);
        this.authService.storeEmail(res.user.email);
        this.authService.storePhone(res.user.phone);
        this.authService.storeName(`${res.user.first_name} ${res.user.last_name}`)
        this.authService.setFirstName(res.user.first_name);
        this.authService.setLastName(res.user.last_name);
        this.authService.setUserName(res.user.username);


        this.userStore.setFullNameForStore(this.authService.getName()||"");
        this.userStore.setEmailForStore(this.authService.getEmail()||"");

        this.adminLogin.reset();
        this.router.navigate(['/Home']);
      },
      error: (err)=>{
          alert("the Your Email Or Phone is Wrong")
      }
    });
       console.log("Done Token");

}}
}
