import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RouterModule, Routes} from '@angular/router';

import {ExpenseListComponent} from './expanse-list/expense-list.component';
import {ExpenseNewComponent} from './expanse-new/expense-new.component';
import {ExpenseItemComponent} from './expense-item/expanse-item.component';
import {AuthGuardGuard} from '../../common/services/auth-guard.guard';


const expenseRoutes: Routes = [
    {
        path: '',
        canActivate: [AuthGuardGuard],
        children: [
            {path: 'report', component: ExpenseListComponent},
            {path: 'expense', component: ExpenseNewComponent},
            {path: 'expense/:id', component: ExpenseNewComponent},
            {path: 'expense/view/:id', component: ExpenseItemComponent}
        ]
    },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(expenseRoutes)
    ],
    exports: [RouterModule],
    declarations: []
})
export class ExpenseRoutingModule {

}
