import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RouterModule, Routes} from '@angular/router';
import {LogoutComponent} from './user-logout/user-logout.component';
import {PasswordComponent} from './user-password/user-password.component';
import {ProfileComponent} from './user-profile/user-profile.component';
import {RegisterComponent} from './user-register/user-register.component';
import {AuthGuardGuard} from '../../common/services/auth-guard.guard';



const userRoutes: Routes = [
    {path: 'register', component: RegisterComponent},
    {
        path: '',
        canActivate: [AuthGuardGuard],
        children: [
            {path: 'profile', component: ProfileComponent},
            {path: 'password', component: PasswordComponent},
            {path: 'logout', component: LogoutComponent}
        ]
    },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(userRoutes)
    ],
    exports: [RouterModule],
    declarations: []
})
export class UserRoutingModule {

}
