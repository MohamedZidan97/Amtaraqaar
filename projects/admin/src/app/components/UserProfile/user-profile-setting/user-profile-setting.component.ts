import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserProfileService } from '../Services/user-profile.service';
import { AuthService } from '../../auth/Services/auth.service';

@Component({
  selector: 'app-user-profile-setting',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './user-profile-setting.component.html',
  styleUrl: './user-profile-setting.component.scss'
})
export class UserProfileSettingComponent implements OnInit {
 
  IdNumber:number = 23156699885544;
  numberValCart:number = 123456;
  commercialNumber:number = 12345678;

  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  // مسار الصورة الافتراضية
  profileImageUrl: string = 'assets/default-profile.png'; 

  userInformation:FormGroup;

constructor(private fb: FormBuilder,private userService:UserProfileService,private authService:AuthService){
  
      this.userInformation = this.fb.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        userName: ['', [Validators.required]],
      });
}

  ngOnInit(): void {
   this.getProfileDataObserve() 
   }

//                               Get User Data

getProfileDataObserve(){
  
this.userService.getProfileData().subscribe({
  next : (res) =>{
         this.setUserInfoToFrom(res.user);
            
         
  },
  error :(err)=>{
    console.log("There error");
  }
})
}


//                                 User Information

setUserInfoToFrom(data:any){
  this.userInformation.patchValue({
     firstName:data.first_name,
     lastName:data.last_name,
     userName:data.username

  }
  )
}


updateProfileDataObserve(){
  const userInfoData = this.userInformation.value;

const data = {
  first_name:userInfoData.firstName,
  last_name:userInfoData.lastName,
  username:userInfoData.userName
} 
this.userService.updateProfileData(data).subscribe({
  next : (res) =>{
           alert("Successfully");
           //this.userInformation.reset();
           this.getProfileDataObserve() 


  },
  error :(err)=>{
    console.log("There error");
  }
})
}


onSubmituserInformation(){
 this.updateProfileDataObserve();
}











  

  // changePassword() {
  //   // منطق تغيير كلمة المرور
  //   if (this.newPassword !== this.confirmPassword) {
  //     alert('كلمات المرور غير متطابقة!');
  //     return;
  //   }

  //   console.log('تم تغيير كلمة المرور:', {
  //     currentPassword: this.currentPassword,
  //     newPassword: this.newPassword,
  //   });
  //   alert('تم تغيير كلمة المرور بنجاح!');
  // }

  // تحميل الصورة الجديدة
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImageUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

    // Show/Hide Password Flags
    showCurrentPassword: boolean = false;
    showNewPassword: boolean = false;
    showConfirmPassword: boolean = false;
  
    // Toggle Password Visibility
    togglePasswordVisibility(field: string): void {
      switch (field) {
        case 'current':
          this.showCurrentPassword = !this.showCurrentPassword;
          break;
        case 'new':
          this.showNewPassword = !this.showNewPassword;
          break;
        case 'confirm':
          this.showConfirmPassword = !this.showConfirmPassword;
          break;
      }
    }
  
    // Submit Handler
    changePassword(): void {
      console.log('Password Updated Successfully!');
    }
}
