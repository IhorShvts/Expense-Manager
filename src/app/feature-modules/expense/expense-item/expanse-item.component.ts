import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ExpenseService} from '../expense.service';

import {Subscription} from 'rxjs/Subscription';
import {IExpense} from '../expense';
import {AuthService} from '../../../common/services/auth.service';
import {MessagesService} from '../../../common/services/messages.service';
import {ServerMessage} from '../../../common/models/server-message';


@Component({
    selector: 'app-expanse-item',
    templateUrl: 'expanse-item.component.html',
    styleUrls: ['expanse-item.component.css']
})

export class ExpenseItemComponent implements OnInit, OnDestroy {
    id: string;
    expense: IExpense;
    private sub: Subscription;

    constructor(private authService: AuthService,
                private expenseService: ExpenseService,
                private route: ActivatedRoute,
                private router: Router,
                private message: MessagesService) {
    }

    ngOnInit(): void {
        this.sub = this.route.params.subscribe(
            params => {
                this.id = params['id'];
                this.getExpense(this.id);
            });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    getExpense(id) {
        this.expenseService.getExpense(id).subscribe((data: ServerMessage) => {
            if (data.success === false) {
                if (data.errcode) {
                    this.authService.logout();
                    this.router.navigate(['login']);
                }
                this.message.error(data.message);
            } else {
                if (data.data[0]) {
                    this.expense = data.data[0];
                } else {
                    this.message.error('Expense id is incorrect in the URL');
                }

            }
        });
    }

    onBack(): void {
        this.router.navigate(['/report'], {queryParamsHandling: 'preserve'});
    }

    goEdit(): void {
        this.router.navigate([`expense/${this.id}`], {queryParamsHandling: 'preserve'});
    }
}
