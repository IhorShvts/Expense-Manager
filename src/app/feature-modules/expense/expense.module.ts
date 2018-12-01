import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ExpenseRoutingModule} from './expense-routing.module';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DatePipe} from '@angular/common';

import {ExpenseListComponent} from './expanse-list/expense-list.component';
import {ExpenseNewComponent} from './expanse-new/expense-new.component';
import {ExpenseItemComponent} from './expense-item/expanse-item.component';

import {ExpenseService} from './expense.service';

import {TruncatePipe} from './truncate.pipe';
import {MaterialModule} from '../../core/material.module';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        ExpenseRoutingModule,
        MaterialModule
    ],
    declarations: [
        ExpenseListComponent,
        ExpenseNewComponent,
        ExpenseItemComponent,
        TruncatePipe
    ],
    providers: [
        DatePipe,
        ExpenseService
    ]
})

export class ExpenseModule {

}
