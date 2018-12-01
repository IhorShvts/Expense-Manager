import {Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {DatePipe} from '@angular/common';
import {ExpenseService} from '../expense.service';

import {IUser} from '../../user/user';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {AuthService} from '../../../common/services/auth.service';
import {MessagesService} from '../../../common/services/messages.service';
import {ServerMessage} from '../../../common/models/server-message';


@Component({
    selector: 'app-expense-new',
    templateUrl: 'expense-new.component.html',
    styleUrls: ['expense-new.component.css']
})

export class ExpenseNewComponent implements OnInit {

    expenseForm: FormGroup;
    userObj: IUser;
    acc: string[] = ['Food', 'Fees', 'Rent', 'Fare', 'Travel', 'Hotel', 'Phone', 'Internet', 'Repairs',
        'Gas', 'Doctor', 'Books', 'Gift', 'Restaurant', 'Electricity', 'Other'];
    expid: string;
    pgTitle: string;
    btnLbl: string;
    expamtPatern = '[0-9]+(\.[0-9][0-9]?)?';

    constructor(private fb: FormBuilder,
                private authService: AuthService,
                private expenseService: ExpenseService,
                private route: ActivatedRoute,
                private router: Router,
                private datePipe: DatePipe,
                private message: MessagesService) {
    }

    @ViewChild('autosize') autosize: CdkTextareaAutosize;

    expdate = new FormControl('', [Validators.required]);
    expaccount = new FormControl('', [Validators.required]);
    expamt = new FormControl('', [Validators.required, Validators.pattern(this.expamtPatern)]);
    expdesc = new FormControl();


    ngOnInit() {

        this.route.params.subscribe((params: {id: string}) => {
            if (params.id) {
                this.expid = params['id'];
                this.getExpense(this.expid);
                this.pgTitle = 'Edit';
                this.btnLbl = 'Update';
            } else {
                this.pgTitle = 'Add';
                this.btnLbl = 'Submit';
            }
        });

        this.userObj = this.authService.currentUser;
        this.expenseForm = this.fb.group({
            expdate: this.expdate,
            expaccount: this.expaccount,
            expamt: this.expamt,
            expdesc: this.expdesc
        });
    }

    getExpense(id) {
        this.expenseService.getExpense(id).subscribe((data: ServerMessage) => {
            if (data.success === true) {
                if (data.data[0]) {
                    this.populateForm(data.data[0]);
                } else {
                    this.message.error('Expense id is incorrect in the URL');
                    this.router.navigate(['report']);
                }
            }
        });
    }

    populateForm(data): void {
        this.expenseForm.patchValue({
            expdate: this.datePipe.transform(data.expensedate, 'y-MM-dd'),
            expaccount: data.expensetype,
            expamt: data.expenseamt,
            expdesc: data.expensedesc
        });
    }

    saveExpense(): void {

        if (this.expenseForm.valid) {
            const theForm = this.expenseForm.value;
            if (this.expid !== '') {
                theForm.expid = this.expid;
            }

            this.expenseService.saveExpense(this.userObj.userid, theForm)
                .subscribe((data: ServerMessage) => {
                    if (data.success === false) {
                        if (data.errcode) {
                            this.authService.logout();
                            this.router.navigate(['login']);
                        }
                        this.message.error(data.message);
                    } else {
                        this.message.success(data.message);
                        this.router.navigate(['/report'], {queryParamsHandling: 'preserve'});
                    }
                    if (!this.expid) {
                        this.expenseForm.reset();
                    }
                }, (err) => {
                    console.log(err);
                });
        }
    }

    onBack(): void {
        this.router.navigate(['/report'], {queryParamsHandling: 'preserve'});
    }
}





