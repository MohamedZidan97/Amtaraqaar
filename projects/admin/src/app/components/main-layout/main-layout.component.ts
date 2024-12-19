import { AfterViewInit, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth/Services/auth.service';
@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent implements AfterViewInit {
  
  constructor(private authService:AuthService){}
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
