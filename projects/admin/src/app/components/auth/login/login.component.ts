import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import { LoginRequest } from '../Models/login-request';
import { Observable } from 'rxjs';
import { UserDbStoreService } from '../Services/user-db-store.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';


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
    ,private toastr:ToastrService
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

   // this.authService.storeToken('Zidan');

  //  console.log("Zidan");
   // this.router.navigate(['/Home']);

    this.authService.login(this.adminLogin.value).subscribe({
      next : (res)=> {
        //alert(res.message);
        this.toastr.success('Login is successfully!', 'Success');
        this.authService.storeToken(res.token);
        this.authService.storeEmail(res.user.email);
        this.authService.storePhone(res.user.phone);
        this.authService.storeName(`${res.user.first_name} ${res.user.last_name}`)
        this.authService.setFirstName(res.user.first_name);
        this.authService.setLastName(res.user.last_name);
        this.authService.storeAvatar(res.user.avatar);


        this.userStore.setFullNameForStore(`${res.user.first_name} ${res.user.last_name}`||"");
        this.userStore.setEmailForStore(res.user.email||"");
        this.userStore.setAvatarForStore(res.user.avatar);

        this.userStore.getAvatarFromStore().subscribe(res1=> console.log(res1))
        this.adminLogin.reset();
        this.router.navigate(['/Home']);
      },
      error: (err)=>{
          this.toastr.error('the Your Email Or Phone is Wrong!', 'Failed');

      }
    });
       console.log("Done Token");

}}
}
