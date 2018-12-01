import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from '../common/components/login/login.component';
import {PageNotFoundComponent} from '../common/components/page-not-found/page-not-found.component';

const appRoutes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'login', component: LoginComponent},
    {path: 'page-not-found', component: PageNotFoundComponent},
    {path: '**', redirectTo: 'page-not-found', pathMatch: 'full'},
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {

}
