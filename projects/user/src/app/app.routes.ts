import { Routes } from '@angular/router';
import { MainLayoutComponent } from './components/MainLayer/main-layout/main-layout.component';
import { LoginComponent } from './components/Auth/login/login.component';
import { RegiserComponent } from './components/Auth/regiser/regiser.component';

export const routes: Routes = [

    {
        path: '', component: MainLayoutComponent, children: [
            { path: '', redirectTo: '/Login', pathMatch: 'full' },// default path
            { path: 'Login', component: LoginComponent },
            { path: 'Register', component: RegiserComponent },

           //   { path: 'RequestsOfAds', component: RequestOpenAdsComponent, canActivate: [AuthGuard] },
          //  { path: 'EditOnAd/:propertyId', component: EditOnAdComponent, canActivate: [AuthGuard] },
          
        ]

        
    },
  
];
