import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {IUser} from '../../feature-modules/user/user';
import {UserMessage} from '../models/user-message';
import {HandleService} from './handle.service';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
    })
};


@Injectable()
export class AuthService {

    currentUser: IUser;

    constructor(private http: HttpClient,
                private handleService: HandleService) {
    }

    isLoggedIn(): boolean {
        try {
            const theUser: {token: string, user: IUser} = JSON.parse(localStorage.getItem('currentUser'));
            if (theUser) {
                this.currentUser = theUser.user;
            }
        } catch (e) {
            return false;
        }
        return !!this.currentUser;
    }

    login(oUser) {
        return this.http.post('http://localhost:5555/api/login', JSON.stringify(oUser), httpOptions).pipe(
            tap((user: UserMessage) => {
                if (user.success) {
                    this.currentUser = <IUser>user.message;
                    const userObj: any = {};
                    userObj.user = user.message;
                    userObj.token = user.token;
                    localStorage.setItem('currentUser', JSON.stringify(userObj));
                }
            }),
            catchError((err) => this.handleService.handleError(err)),
        );
    }

    logout(): void {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
    }
}
