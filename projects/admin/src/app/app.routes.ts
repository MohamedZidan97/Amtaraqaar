import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { NotFoundComponent } from './components/main-layout/not-found/not-found.component';
import { HomeComponent } from './components/main-layout/home/home.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { AuthGuard } from './Guard/auth.guard';
import { RequestOpenAdsComponent } from './components/main-layout/RealStates/RealState/request-open-ads/request-open-ads.component';
import { ShowTheAdComponent } from './components/main-layout/RealStates/RealState/show-the-ad/show-the-ad.component';
import { EditOnAdComponent } from './components/main-layout/RealStates/RealState/edit-on-ad/edit-on-ad.component';
import { ShowAllPackagesComponent } from './components/main-layout/Paymentpackages/show-all-packages/show-all-packages.component';
import { EditOnPackageComponent } from './components/main-layout/Paymentpackages/edit-on-package/edit-on-package.component';
import { ControlOnLocationsComponent } from './components/main-layout/DetailsOfProperities/control-on-locations/control-on-locations.component';
import { PackageItemsComponent } from './components/main-layout/Paymentpackages/package-items/package-items.component';
import { ClassifyAnAdditionPropertyComponent } from './components/main-layout/DetailsOfProperities/classify-an-addition-property/classify-an-addition-property.component';
import { ShowAllAdvsComponent } from './components/main-layout/RealStates/RealState/show-all-advs/show-all-advs.component';
import { UserProfileSettingComponent } from './components/UserProfile/user-profile-setting/user-profile-setting.component';
import { AddPropertyComponent } from './components/main-layout/RealStates/RealState/add-property/add-property.component';
import { SettingComponent } from './components/main-layout/Settings/setting/setting.component';
import { EditUserComponent } from './components/main-layout/UsersSettings/edit-user/edit-user.component';
import { ShowAllUsersComponent } from './components/main-layout/UsersSettings/show-all-users/show-all-users.component';
import { ShowListOfChatsOfUsersComponent } from './components/main-layout/UsersSettings/Chatting/show-list-of-chats-of-users/show-list-of-chats-of-users.component';
import { ShowChattingBetweenTwoUsersComponent } from './components/main-layout/UsersSettings/Chatting/show-chatting-between-two-users/show-chatting-between-two-users.component';
import { ShowAllTechnicalSupportMessagesComponent } from './components/main-layout/UsersSettings/TechnicalSupport/show-all-technical-support-messages/show-all-technical-support-messages.component';
import { ReplyOnTechnicalSupportMessageComponent } from './components/main-layout/UsersSettings/TechnicalSupport/reply-on-technical-support-message/reply-on-technical-support-message.component';

export const routes: Routes = [

    {
        path: '', component: MainLayoutComponent, children: [
            { path: '', redirectTo: '/Login', pathMatch: 'full' },// default path
            { path: 'Home', component: HomeComponent, canActivate: [AuthGuard] },
            { path: 'RequestsOfAds', component: RequestOpenAdsComponent, canActivate: [AuthGuard] },
            { path: 'ShowTheAd', component: ShowTheAdComponent, canActivate: [AuthGuard] },
            { path: 'EditOnAd/:propertyId', component: EditOnAdComponent, canActivate: [AuthGuard] },
            { path: 'ShowAllPackages', component: ShowAllPackagesComponent, canActivate: [AuthGuard] },
            { path: 'EditOnPackage', component: EditOnPackageComponent, canActivate: [AuthGuard] },
            { path: 'ControlOnLocation', component: ControlOnLocationsComponent, canActivate: [AuthGuard] },
            { path: 'EditOnPackage/:packageId', component: EditOnPackageComponent, canActivate: [AuthGuard] },
            { path: 'ShowPackageItems', component: PackageItemsComponent, canActivate: [AuthGuard] },
            { path: 'ClassifyAndAdditionProperty', component: ClassifyAnAdditionPropertyComponent, canActivate: [AuthGuard] },
            { path: 'ShowAllAdvs', component: ShowAllAdvsComponent, canActivate: [AuthGuard] },
            { path: 'UserProfile', component: UserProfileSettingComponent, canActivate: [AuthGuard] },
            { path: 'AddProperty', component: AddPropertyComponent, canActivate: [AuthGuard] },
            { path: 'Setting', component: SettingComponent, canActivate: [AuthGuard] },
            { path: 'EditUser/:userId', component: EditUserComponent, canActivate: [AuthGuard] },
            { path: 'ShowAllUsers', component: ShowAllUsersComponent, canActivate: [AuthGuard] },
            { path: 'ShowListChats', component: ShowListOfChatsOfUsersComponent, canActivate: [AuthGuard] },
            { path: 'ShowChattingBetweenTwoUser', component: ShowChattingBetweenTwoUsersComponent, canActivate: [AuthGuard] },
            { path: 'ShowAllTechnicalSupportMessages', component: ShowAllTechnicalSupportMessagesComponent, canActivate: [AuthGuard] },
            { path: 'ReplyOnTechnicalSupportMessage', component: ReplyOnTechnicalSupportMessageComponent, canActivate: [AuthGuard] }

        ]
    },
    //  {path:'Register',component:RegisterComponent},
    // {path:'MainLayout',component:MainLayoutComponent},
    { path: 'Login', component: LoginComponent },
    { path: '**', component: NotFoundComponent }
];
