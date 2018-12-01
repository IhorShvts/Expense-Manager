import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {IUser} from '../user/user';
import {HandleService} from '../../common/services/handle.service';
import {ServerMessage} from '../../common/models/server-message';


@Injectable()
export class ExpenseService {

    jwtToken: string;

    constructor(private http: HttpClient, private handleService: HandleService) {
        const theUser: {token: string, user: IUser} = JSON.parse(localStorage.getItem('currentUser'));

        if (theUser) {
            this.jwtToken = theUser.token;
        }
    }

    saveExpense(userid, oExpense) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `${this.jwtToken}`
            })
        };
        return this.http.post(`http://localhost:5555/api/expense/${userid}`, JSON.stringify(oExpense), httpOptions).pipe(
            tap(
                (response: ServerMessage) => console.log(response)
            ),
            catchError((err) => this.handleService.handleError(err)),
        );
    }

    getExpenses(userid, oExpense) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `${this.jwtToken}`
            })
        };
        return this.http.post(`http://localhost:5555/api/expense/report/${userid}`, JSON.stringify(oExpense), httpOptions).pipe(
            tap(
                (response: ServerMessage) => console.log(response)
            ),
            catchError((err) => this.handleService.handleError(err)),
        );
    }

    getExpenseTotal(userid, oExpense) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `${this.jwtToken}`
            })
        };
        return this.http.post(`http://localhost:5555/api/expense/total/${userid}`, JSON.stringify(oExpense), httpOptions).pipe(
            tap(
                (response: ServerMessage) => console.log(response)
            ),
            catchError((err) => this.handleService.handleError(err)),
        );
    }

    getExpense(expid) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `${this.jwtToken}`
            })
        };
        return this.http.get(`http://localhost:5555/api/expense/${expid}`, httpOptions).pipe(
            tap(
                (response: ServerMessage) => console.log(response)
            ),
            catchError((err) => this.handleService.handleError(err)),
        );
    }

    delExpense(expid) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `${this.jwtToken}`
            })
        };
        return this.http.delete(`http://localhost:5555/api/expense/${expid}`, httpOptions).pipe(
            tap(
                (response: ServerMessage) => console.log(response)
            ),
            catchError((err) => this.handleService.handleError(err)),
        );
    }
}
