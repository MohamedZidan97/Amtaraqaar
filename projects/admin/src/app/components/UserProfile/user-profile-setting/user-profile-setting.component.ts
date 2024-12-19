import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-profile-setting',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './user-profile-setting.component.html',
  styleUrl: './user-profile-setting.component.scss'
})
export class UserProfileSettingComponent {
  firstName: string = 'محمد';
  lastName: string = 'القحطاني';
  email: string = 'email@example.com';
  userName:string = '@example';
  IdNumber:number = 23156699885544;
  numberValCart:number = 123456;
  commercialNumber:number = 12345678;

  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  // مسار الصورة الافتراضية
  profileImageUrl: string = 'assets/default-profile.png'; 

  updateProfile() {
    // منطق تحديث البيانات
    console.log('تم تحديث الملف الشخصي:', {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
    });
    alert('تم تحديث الملف الشخصي بنجاح!');
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
