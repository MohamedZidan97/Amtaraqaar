import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth/Services/auth.service';
import { UserDbStoreService } from '../auth/Services/user-db-store.service';
import { environment } from '../../Environments/environment.prod';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent implements AfterViewInit,OnInit {
    avatar$:string='';
    fullName$:string='';
    email$='';
    fullName?:string;
    avatar?:string;
    email?:string;

    baseUrl: string = environment.baseUrl;
  
  constructor(private authService:AuthService,
    private userStore:UserDbStoreService
  ){}
  ngOnInit(): void {
    this.fullName = this.authService.getName() as string;
    this.avatar = this.authService.getAvatar() as string;
    this.email = this.authService.getEmail() as string;

    this.userStore.getAvatarFromStore().subscribe((res)=>this.avatar$=res)
    this.userStore.getFullNameFromStore().subscribe((res)=>this.fullName$=res)
    this.userStore.getEmailFromStore().subscribe((res)=>this.email$=res)

  }
   // يتم تنفيذ الكود بعد أن يتم تحميل الـ DOM
   ngAfterViewInit() {
    // العثور على زر التبديل (Toggle)
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const content = document.querySelector('.content');

    // التأكد من وجود العناصر قبل إضافة المستمع (Listener)
    if (sidebarToggle && sidebar && content) {
      sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('hidden');
        content.classList.toggle('fullwidth');
      });
    }
  }



  logOut() {
    this.authService.logOut();
  }
}
