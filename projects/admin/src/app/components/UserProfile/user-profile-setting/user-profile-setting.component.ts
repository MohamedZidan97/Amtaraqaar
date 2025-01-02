import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserProfileService } from '../Services/user-profile.service';
import { AuthService } from '../../auth/Services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../Environments/environment.prod';
import { UserDbStoreService } from '../../auth/Services/user-db-store.service';

@Component({
  selector: 'app-user-profile-setting',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-profile-setting.component.html',
  styleUrl: './user-profile-setting.component.scss'
})
export class UserProfileSettingComponent implements OnInit {

  IdNumber: number = 23156699885544;
  numberValCart: number = 123456;
  commercialNumber: number = 12345678;

  userInformationForm: FormGroup;
  changePasswordForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserProfileService, private authService: AuthService
    , private toastr: ToastrService,private userStore:UserDbStoreService
  ) {

    this.userInformationForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      userName: ['', [Validators.required]],
    });

    this.changePasswordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });

  }

  ngOnInit(): void {
    this.getProfileDataObserve()
  }

  //                               Get User Data

  getProfileDataObserve() {

    this.userService.getProfileData().subscribe({
      next: (res) => {
        this.setUserInfoToFrom(res.user);
        this.authService.storeAvatar(res.user.avatar||"");
        this.authService.storeName(`${res.user.first_name} ${res.user.last_name}`||"");



        console.log("get data of user", res);
      },
      error: (err) => {
        console.log("There error");
      }
    })
  }


  //                                 User Information

  setUserInfoToFrom(data: any) {
    this.userInformationForm.patchValue({
      firstName: data.first_name,
      lastName: data.last_name,
      userName: data.username

    }
    )
    this.profileImageUrl = data.avatar;
  }


  updateProfileDataObserve() {
    const userInfoData = this.userInformationForm.value;

    const data = {
      first_name: userInfoData.firstName,
      last_name: userInfoData.lastName,
      username: userInfoData.userName
    }
    this.userService.updateProfileData(data).subscribe({
      next: (res) => {
        this.toastr.success("تم تغيير المعلومات الشخصية", "تمة العملية :)");
        //this.userInformation.reset();
        this.getProfileDataObserve()


      },
      error: (err) => {
        console.log("There error");
      }
    })
  }


  onSubmituserInformation() {
    this.updateProfileDataObserve();
  }

  ///                                 Change Avatar


  // مسار الصورة الافتراضية
  profileImageUrl: string = '';

  baseUrl:string=environment.baseUrl;

  // تحميل الصورة الجديدة
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImageUrl = reader.result as string;
      };
      reader.readAsDataURL(file);


      const formData = new FormData();
      formData.append("avatar",file)
      this.userService.updateAvatar(formData).subscribe({
        next: (res) => {
          this.toastr.success("تم تغيير الصورة الشخصية", "تمة العملية");
          this.getProfileDataObserve()
        },
        error: (err) => {
          console.log("There error ", err);
        }

      })



    }
  }





  //                                  Update Password

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

  // update password

  updatePasswordObserve(): any {
    const changePasswordData = this.changePasswordForm.value;

    const data = {
      old_password: changePasswordData.currentPassword,
      new_password: changePasswordData.newPassword
    }

    if (changePasswordData.newPassword != changePasswordData.confirmPassword) {
      return this.toastr.error("تأكد من تطابق كلمتي المرور", "خطأ");
    }

    this.userService.updatePassword(data).subscribe({
      next: (res) => {
        this.toastr.success("تم تغيير  كلمة المرور", "تمة العملية");
        //this.userInformation.reset();
        this.getProfileDataObserve()
      },
      error: (err) => {
        console.log("There error ", err);
      }
    })
  }

  // Submit Handler
  onSubmitchangePassword() {
    this.updatePasswordObserve();
  }
}
