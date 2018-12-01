import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app/app.component';
import {LoginComponent} from '../common/components/login/login.component';

import {UserModule} from '../feature-modules/user/user.module';
import {ExpenseModule} from '../feature-modules/expense/expense.module';

import {AuthService} from '../common/services/auth.service';
import {AuthGuardGuard} from '../common/services/auth-guard.guard';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import 'node_modules/hammerjs/hammer.js';
import {MessagesService} from '../common/services/messages.service';
import {PageNotFoundComponent} from '../common/components/page-not-found/page-not-found.component';
import {HandleService} from '../common/services/handle.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        UserModule,
        ExpenseModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule

    ],
    declarations: [
        AppComponent,
        LoginComponent,
        PageNotFoundComponent
    ],
    bootstrap: [AppComponent],
    providers: [AuthService, AuthGuardGuard, MessagesService, HandleService],
})
export class AppModule {
}
