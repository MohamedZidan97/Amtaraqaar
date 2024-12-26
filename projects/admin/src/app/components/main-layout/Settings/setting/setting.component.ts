import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.scss'
})
export class SettingComponent {
  personalizeSearch = false;
  agreeToShowTheAds = false;

  togglePersonalizeSearch(): void {
    this.personalizeSearch = !this.personalizeSearch;
    console.log('Personalize Search:', this.personalizeSearch);
  }
  toggleAgreeToShowTheAds(): void {
    this.agreeToShowTheAds = !this.agreeToShowTheAds;
    console.log('Agree To Show The Ads:', this.agreeToShowTheAds);
  }
}
