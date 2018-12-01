import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {UserRoutingModule} from './user-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {RegisterComponent} from './user-register/user-register.component';
import {ProfileComponent} from './user-profile/user-profile.component';
import {PasswordComponent} from './user-password/user-password.component';
import {LogoutComponent} from './user-logout/user-logout.component';
import {UserService} from './user.service';
import {MaterialModule} from '../../core/material.module';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        UserRoutingModule,
        MaterialModule
    ],
    declarations: [
        RegisterComponent,
        ProfileComponent,
        PasswordComponent,
        LogoutComponent
    ],
    providers: [

        UserService
    ]
})
export class UserModule {

}
